import axios from 'axios';
import { stringify } from 'query-string';
import defaultQueryParams from 'client/defaultQueryParams';

/**
 * ...
 *
 * @author Andrew McLagan <andrewmclagan@gmail.com>
 */

class Client {

  httpVerbs = [
    'post', 'get', 'put', 'patch', 'delete',
  ]

  environments = [
    'production', 'development', 'test'
  ]

  environment = 'production'

  /**
   * ...
   *
   * @return Promise
   */
  constructor(environment = 'production') {
    this.setEnvironment(environment);
    this.generateHttpVerbFunctions();
  }

};

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.generateHttpVerbFunctions = function () {
  this.httpVerbs.forEach(verb => {
    this[verb] = (route, params) => {
      const organisationId = params && params.organisationId;
      const requestUrl = this.getDomain(this.environment) + this.generateRoute(route, organisationId);
      const requestParams = this.formatRequestParameters(verb, requestUrl, params);
      return this.dispatchRequest(requestParams);
    };
  });
}

/**
 * ...
 *
 * @return Void
 */

Client.prototype.setEnvironment = function (environment) {
  if (this.environments.includes(environment)) {
    return this.environment = environment;
  }
  throw Error('Invalid environment value.');
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.dispatchRequest = function (params) {
  return axios.request(params)
    .then(response => ({
      data: response && response.data && response.data.data ? response.data.data : {},
      error: null,
    }))
    .catch(error => ({
      data: {},
      error: error && error.response && error.response.data ? error.response.data : {
        message: null,
        statusCode: null,
      },
    }));
}


/**
 * ...
 *
 * @return Promise
 */

Client.prototype.formatRequestParameters = function (verb, url, params) {
  return {
    method: verb,
    url,
    timeout: 3500,
    data: {
      ...defaultQueryParams,
      ...params,
    },
    headers: {},
  };
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.generateRoute = function (baseRoute, organisationId = null) {
  if (typeof baseRoute === 'string') {
    if (organisationId) {
      return `/organisation/${organisationId}${baseRoute}`;
    }
    return baseRoute;
  }
  return '';
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.getDomain = function (environment = '') {
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
 * ...
 *
 * @return Promise
 */

Client.prototype.link = function (type, params) {
  if (typeof type === 'string') {
    let stringifiedParams = '';
    if (typeof params === 'object' && Object.keys(params).length) {
      stringifiedParams = `?${stringify(params)}`;
    }
    return `/export/${type}${stringifiedParams}`;
  }
  return '';
}

/*
|--------------------------------------------------------------------------
| Export Client as default
|--------------------------------------------------------------------------
*/

export default Client;
