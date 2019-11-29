import jwtDecode from 'jwt-decode';
import ApiError from './ApiError';
import { fromImmutable } from './immutable';
import stringify from './stringify';
import canUseDom from './canUseDom';
import getEnvironmentVariable from './getEnvironmentVariable';
import './FormData';
import './localStorage';

export default new function () {

  ['auth','jobs','media'].forEach(helperNamespace => {
    this[helperNamespace] = {};
  });

  /**
   * Determines current env
   * @return String
   */
  this.getEnvironment = () => getEnvironmentVariable('EJ_ENV', 'production');
  };

  this.parseParams = params => {
    if (params instanceof FormData) {
      return params;
    }
    return JSON.stringify(fromImmutable(params));
  };

  this.getHeaders = (params, headers) => {
    const authHeader = {
      'Authorization': this.getAuthToken(),
    };
    const jsonHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    return params instanceof FormData ?
      Object.assign({}, authHeader, headers) :
      Object.assign({}, jsonHeaders, authHeader, headers);
  };

  /**
   * Helper to return the body of the request
   * - If it is a GET or HEAD request, then set the body to undefined to support IE Edge.
   *
   * @return XXX
   */
  this.getParamsBody = (verb, params) => {
    const noBody = (verb.toUpperCase() === 'GET' || verb.toUpperCase() === 'HEAD');
    return noBody ? undefined : this.parseParams(params);
  };

  /**
   * Very defensive here for older browsers and those blocking cookies/storage
   *
   * @return {string}
   */
  this.getAuthToken = () => {
    if (localStorage) {
      try {
        return localStorage.getItem('_token') ? 'Bearer ' + localStorage.getItem('_token') : '';
      } catch (error) {
        return '';
      }
    }
    return '';
  };


  this.getParams = (verb = 'GET', params, headers) => {
    const parsed = {
      method: verb.toUpperCase(),
      timeout: 15000,
      body: this.getParamsBody(verb, params),
      headers: this.getHeaders(params, headers),
    };
    // Isomorphic SSL support
    // TODO: verify actual certs
    if (!canUseDom()) {
      const https = require("https");
      parsed.agent = new https.Agent({
        rejectUnauthorized: false
      });
    }
    return parsed;
  };

  this.getDomain = (environment = '') => {
    switch (environment.toLowerCase()) {
      default:
      case 'production':
        return 'https://api.ethicaljobs.com.au';
      case 'staging':
        return 'https://api.ethicalstaging.com.au';
      case 'development':
        return 'https://api.ethicaljobs.local';
    }
  }

  this.getRoute = (route = '', verb, params = {}) => {
    if (verb.toUpperCase() === 'GET') {
      const parsedParams = fromImmutable(params);
      const queryString = stringify(parsedParams);
      return route + (queryString.length ? `?${queryString}` : '');
    } else {
      return route;
    }
  }

  this.parseJson = response => {
    return response.text().then(text => {
      const json = text ? JSON.parse(text) : {};
      return {
        status: response.status,
        ok: response.ok,
        json,
      };
    });
  }

  this.checkStatus = response => {
    if (response.ok) {
      return response.json;
    } else {
      throw new ApiError(
        response.json.message,
        response.json.errors,
        response.status,
        response.json.debug
      );
    }
  }

  this.setTokenFromResponse = response => {
    if (response.hasOwnProperty('access_token')) {
      localStorage.setItem('_token', response.access_token);
    } else if (response && response.meta && response.meta.access_token) {
      localStorage.setItem('_token', response.meta.access_token);
    }

    if (response.hasOwnProperty('refresh_token')) {
      localStorage.setItem('refresh_token', response.refresh_token)
    } else if (response && response.meta && response.meta.refresh_token) {
    localStorage.setItem('refresh_token', response.meta.refresh_token);
  }

    return response;
  }

  this.dispatchRequest = (verb, route, params, headers) => {
    const performRequest = this.performRequest.bind(null, verb, route, params, headers);

    return performRequest()
      .catch(error => {
        if (error.statusCode === 401) {
          return this.auth.refreshTokens(performRequest, error);
        }
        throw error;
      });
  }

  this.performRequest = (verb, route, params, headers) => {
    const reqUrl = this.getDomain(this.environment) + this.getRoute(route, verb, params);
    const reqParams = this.getParams(verb, params, headers);

    return fetch(reqUrl, reqParams)
      .then(this.parseJson)
      .then(this.checkStatus)
      .then(this.setTokenFromResponse);
  }

  this.link = (route, params) => {
    let stringifiedParams = '';
    if (typeof params === 'object' && Object.keys(params).length) {
      stringifiedParams = `?${stringify(params)}`;
    }
    return `${this.getDomain(this.environment)}${route}${stringifiedParams}`;
  }

  this.initialize = () => {
    return this.get('/', {});
  }

  this.exportUrl = (resource, params) => {
    const paramsWithSecret = Object.assign({}, params, { secret:  this.getFileDownloadSecret() });
    return this.link(`/exports/csv/${resource}`, paramsWithSecret);
  }

  /**
   * @return string
   */
  this.getFileDownloadSecret = () => {
    return getEnvironmentVariable('FILE_DOWNLOAD_API_SECRET');
  }

  this.search = (resource, params) => {
    return this.get(`/search/${resource}`, params);
  }

  this.archive = (resource, id) => {
    return this.delete(`/${resource}/${id}`);
  }

  this.restore = (resource, id) => {
    return this.patch(`/${resource}/${id}`, { deleted_at: null });
  }

  this.auth.login = values => {
    const { username, password } = fromImmutable(values);
    return this.post('/auth/login', {
        username,
        password,
      })
      .then(this.setTokenFromResponse)
      .then(this.auth.load);
  }

  this.auth.refreshTokens = (callback, initialRequestError = new Error('Token refresh failed')) => {
    const refresh_token = localStorage.getItem('refresh_token');
    const handleFailure = () => {
      this.auth.logout();
      throw initialRequestError;
    };

    if (!refresh_token) handleFailure();

    return this.performRequest('post', '/auth/refresh', { refresh_token })
      .then(callback, handleFailure);
  }

  this.auth.logout = () => {
    return new Promise(resolve => {
      localStorage.removeItem('_token');
      localStorage.removeItem('refresh_token');
      resolve(true);
    });
  }

  this.auth.load = () => {
    const token = localStorage.getItem('_token');
    try {
      return this.get(`/users/${jwtDecode(token).sub}`);
    } catch (error) {
      return this.get(`/users/-1`);
    }
  }

  this.auth.recoverPassword = email => {
    return this.post('/users/passwords/recover', { email });
  }

  this.auth.resetPassword = params => {
    return this.post('/users/passwords/reset', params);
  }

  this.jobs.approve = id => {
    return this.patch(`/jobs/${id}`, { status: 'APPROVED' });
  }

  this.jobs.expire = id => {
    return this.patch(`/jobs/${id}`, { expires_at: (new Date).getTime() });
  }

  this.media.upload = file => {
    const formData = new FormData()
    formData.append('media', file);
    return this.post('/media', formData);
  }

  this.media.attach = (file, resource, resourceId) => {
    const formData = new FormData()
    formData.append('media', file);
    return this.post(`/media/${resource}/${resourceId}`, formData);
  }

  this.media.detach = (id, resource) => {
    return this.delete(`/media/${id}/${resource}`);
  }

  this.media.delete = id => {
    return this.delete(`/media/${id}`);
  }

  this.environment = this.getEnvironment();

  ['post', 'get', 'put', 'patch', 'delete'].forEach(verb => {
    this[verb] = (route, params, headers) =>
      this.dispatchRequest(verb, route, params, headers);
  });
};
