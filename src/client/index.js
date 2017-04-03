import fetch from 'unfetch';
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
      const requestUrl = this.getDomain(this.environment) + route;
      const requestParams = this.formatRequestParameters(verb, params);
      return this.dispatchRequest(requestUrl, requestParams);
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

Client.prototype.formatRequestParameters = function (verb, params) {
  return {
    method: verb,
    timeout: 3500, // ?? works with fetch?
    body: JSON.stringify({
      ...params,
    }),
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
