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
  this.getEnvironment = () => {
    return getEnvironmentVariable('EJ_ENV', 'production');
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseParams = params => {
    if (params instanceof FormData) {
      return params;
    }
    return JSON.stringify(fromImmutable(params));
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
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
   * Javascript style DocBlock
   * @return {string}
   */
  this.getAuthToken = () => {
    return localStorage.getItem('_token') ?
      'Bearer ' + localStorage.getItem('_token') : '';
  };  

    /**
   * Javascript style DocBlock
   * @return XXX
   */
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

  /**
   * Javascript style DocBlock
   * @return XXX
   */
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

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getRoute = (route = '', verb, params = {}) => {
    if (verb.toUpperCase() === 'GET') {
      const parsedParams = fromImmutable(params);
      const queryString = stringify(parsedParams);
      return route + (queryString.length ? `?${queryString}` : '');
    } else {
      return route;
    }
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
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

  /**
   * Javascript style DocBlock
   * @return XXX
   */
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

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.setTokenFromResponse = response => {
    if (response.hasOwnProperty('access_token')) {
      localStorage.setItem('_token', response.access_token);
    } else if (response && response.meta && response.meta.access_token) {
      localStorage.setItem('_token', response.meta.access_token);
    }
    return response;
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.dispatchRequest = (verb, route, params, headers) => {
    const reqUrl = this.getDomain(this.environment) + this.getRoute(route, verb, params);
    const reqParams = this.getParams(verb, params, headers);

    return fetch(reqUrl, reqParams)
      .then(this.parseJson)
      .then(this.checkStatus)
      .then(this.setTokenFromResponse);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.link = (route, params) => {
    let stringifiedParams = '';
    if (typeof params === 'object' && Object.keys(params).length) {
      stringifiedParams = `?${stringify(params)}`;
    }
    return `${this.getDomain(this.environment)}${route}${stringifiedParams}`;
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.initialize = () => {
    return this.get('/', {});
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.exportUrl = (resource, params) => {
    return this.link(`/exports/csv/${resource}`, params);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.search = (resource, params) => {
    return this.get(`/search/${resource}`, params);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.archive = (resource, id) => {
    return this.delete(`/${resource}/${id}`);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.restore = (resource, id) => {
    return this.patch(`/${resource}/${id}`, { deleted_at: null });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.login = values => {
    const { username, password } = fromImmutable(values);
    return this.post('/oauth/token', {
        client_id: getEnvironmentVariable('AUTH_CLIENT_ID'),
        client_secret: getEnvironmentVariable('AUTH_CLIENT_SECRET'),
        grant_type: 'password',
        scope: '*',
        username,
        password,
      })
      .then(this.setTokenFromResponse)
      .then(this.auth.load);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.logout = () => {
    return new Promise(resolve => {
      localStorage.removeItem('_token');
      resolve(true);
    });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.load = () => {
    const token = localStorage.getItem('_token');
    try {
      return this.get(`/users/${jwtDecode(token).sub}`);
    } catch (error) {
      return this.get(`/users/-1`);
    }
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.recoverPassword = email => {
    return this.post('/users/passwords/recover', { email });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.resetPassword = params => {
    return this.post('/users/passwords/reset', params);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.approve = id => {
    return this.patch(`/jobs/${id}`, { status: 'APPROVED' });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.expire = id => {
    return this.patch(`/jobs/${id}`, { expires_at: (new Date).getTime() });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.upload = file => {
    const formData = new FormData()
    formData.append('media', file);
    return this.post('/media', formData);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.attach = (file, resource, resourceId) => {
    const formData = new FormData()
    formData.append('media', file);
    return this.post(`/media/${resource}/${resourceId}`, formData);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.detach = (id, resource) => {
    return this.delete(`/media/${id}/${resource}`);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.delete = id => {
    return this.delete(`/media/${id}`);
  }

  this.environment = this.getEnvironment();

  ['post', 'get', 'put', 'patch', 'delete'].forEach(verb => {
    this[verb] = (route, params, headers) => 
      this.dispatchRequest(verb, route, params, headers);
  });
};
