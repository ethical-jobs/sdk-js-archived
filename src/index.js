import { stringify } from 'query-string';
import ApiError from './ApiError';

const Client = function (environment) {

  this.environment = environment || 'production';

  ['post', 'get', 'put', 'patch', 'delete'].forEach(verb => {
    this[verb] = (route, params) => this.dispatchRequest(verb, route, params);
  });

  ['auth','jobs'].forEach(helperNamespace => {
    this[helperNamespace] = {};
  });

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getParams = (verb, params) => {
    return {
      method: verb,
      timeout: 3500,
      body: verb === 'get' ? null : JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
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
      case 'test':
        return 'http://api.ethicalstaging.com.au';
      case 'development':
        return 'http://api.ethicaljobs.local';
    }
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getRoute = (route = '', verb = '', params = {}) => {
    const queryString = verb === 'get' ? stringify(params) : '';
    return route + (queryString.length ? `?${queryString}` : '');
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseJson = (response) => {
    return response.json().then(json => ({
      status: response.status,
      ok: response.ok,
      json,
    }));
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseJson = (response) => {
    if (response.ok) {
      return response.json;
    } else {
      throw new ApiError(response.json.message, response.json);
    }
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
      .then(this.checkStatus);
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
    return `${route}${stringifiedParams}`;
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
  this.auth.login = (params) => {
    return this.post('/users/token', params)
      .then(response => {
          localStorage.setItem('_token', response && response.meta && response.meta.token);
          return response;
      });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.logout = () => {
    localStorage.removeItem('_token');
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
  this.auth.recoverPassword = (email) => {
    return this.post('/users/token/recover', { email });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.resetPassword = (params) => {
    return this.post('/auth/reset', params);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.approve = (id) => {
    return this.patch(`/jobs/${id}`, { status: 'APPROVED' });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.expire = (id) => {
    return this.patch(`/jobs/${id}`, { expires_at: (new Date).getTime() });
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.attachMedia = (id, formData) => {
    return this.post(`/jobs/${id}/attachments`, formData);
  }

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.detachMedia = (id, attachmentId) => {
    return this.delete(`/jobs/${id}/attachments/${attachmentId}`, {});
  }
};

export default {
  Client,
  ApiError,
};
