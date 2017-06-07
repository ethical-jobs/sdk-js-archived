import ApiError from './ApiError';
import { fromImmutable } from './immutable';
import stringify from './stringify';
import canUseDom from './canUseDom';
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
    let env;
    if (canUseDom()) {
      env = window.EJ_ENV;
    } else {
      env = process.env.EJ_ENV || process.env.REACT_APP_EJ_ENV;
    }
    return env || 'production';
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
  this.getHeaders = params => {
    if (params instanceof FormData) {
      return undefined;
    }
    const auth = localStorage.getItem('_token') ?
      'Bearer ' + localStorage.getItem('_token') : '';
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': auth,
    }
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getParams = (verb = 'GET', params) => {
    return {
      method: verb.toUpperCase(),
      timeout: 3500,
      body: verb.toUpperCase() === 'GET' ? null : this.parseParams(params),
      headers: this.getHeaders(params),
    };
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getDomain = (environment = '') => {
    switch (environment.toLowerCase()) {
      default:
      case 'production':
        return 'http://api.ethicaljobs.com.au';
      case 'staging':
        return 'http://api.ethicalstaging.com.au';
      case 'development':
        return 'http://api.ethicaljobs.local';
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
        response.json.statusCode,
        response.json.debug
      );
    }
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.checkForToken = response => {
    if (response && response.meta && response.meta.token) {
      localStorage.setItem('_token', response.meta.token)
    }
    return response;
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.dispatchRequest = (verb, route, params) => {
    const reqUrl = this.getDomain(this.environment) + this.getRoute(route, verb, params);
    const reqParams = this.getParams(verb, params);
    return fetch(reqUrl, reqParams)
      .then(this.parseJson)
      .then(this.checkStatus)
      .then(this.checkForToken);
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
  this.auth.login = params => {
    return this.post('/users/token', params);
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
    return this.get(`/users/token/${token}`);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.recoverPassword = email => {
    return this.post('/users/token/recover', { email });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.resetPassword = params => {
    return this.post('/users/token/reset', params);
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
  this.media.delete = id => {
    return this.delete(`/media/${id}`);
  }

  this.environment = this.getEnvironment();

  ['post', 'get', 'put', 'patch', 'delete'].forEach(verb => {
    this[verb] = (route, params) => this.dispatchRequest(verb, route, params);
  });
};
