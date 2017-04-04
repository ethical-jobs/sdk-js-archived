import 'isomorphic-fetch';
import { stringify } from 'query-string';

/**
 * ...
 *
 * @author Andrew McLagan <andrewmclagan@gmail.com>
 */

class Client {

  httpVerbs = [
    'post', 'get', 'put', 'patch', 'delete',
  ]

  /**
   * ...
   *
   * @return Promise
   */
  constructor(environment = 'production') {
    this.environment = environment;
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
      const reqUrl = this.formatRoute(route, verb, params);
      const reqParams = this.formatParameters(verb, params);
      return this.dispatchRequest(reqUrl, reqParams);
    }; 
  });
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.dispatchRequest = function (url, params) {
  return fetch(url, params)
    .then(response => response.json())
    .catch(error => error);
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.formatParameters = function (verb, params) {
  return {
    method: verb,
    timeout: 3500,
    body: verb === 'get' ? JSON.stringify({}) : JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.formatRoute = function (route = '', verb = '', params = {}) {
  const queryString = verb === 'get' ? stringify(params) : '';
  return this.getDomain(this.environment) + route + (queryString.length ? `?${queryString}` : '');
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
      return '//api.ethicaljobs.com.au';
    case 'test':
      return '//api.ethicalstaging.com.au';
    case 'development':
      return '//api.ethicaljobs.local';
  }
}

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.link = function (route, params) {
  let stringifiedParams = '';
  if (typeof params === 'object' && Object.keys(params).length) {
    stringifiedParams = `?${stringify(params)}`;
  }
  return `${route}${stringifiedParams}`;
}

/*
|--------------------------------------------------------------------------
| Export Client as default
|--------------------------------------------------------------------------
*/

export default Client;
