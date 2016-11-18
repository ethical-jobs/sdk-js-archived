import { stringify } from 'query-string';
import makeRequest from 'client/makeRequest';
import generateRoute from 'client/generateRoute';
import defaultQueryParams from 'client/defaultQueryParams';

/**
 * ...
 *
 * @author Andrew McLagan <andrewmclagan@gmail.com>
 */

export class Client {

  httpVerbs = [
    'post', 'get', 'put', 'patch', 'delete',
  ]

  /**
   * ...
   *
   * @return Promise
   */
  constructor(makeRequest, generateRoute) {
    this.makeRequest = makeRequest;
    this.generateRoute = generateRoute;
  }

  /**
   * ...
   *
   * @return Promise
   */
  generateHttpVerbFunctions = () => {
    this.httpVerbs.forEach(verb => {
      this[verb] = function (route, params) {
        return this.makeRequest({
          method: verb,
          url: this.generateRoute(route, params && params.organisationId),
          data: {
            ...defaultQueryParams,
            ...params,
          }
          // headers: { Authorization },
        });
      }
    });
  }

  /**
   * ...
   *
   * @return Promise
   */
  link = (type, params) => {
    if (typeof type === 'string') {
      let stringifiedParams = '';
      if (typeof params === 'object' && Object.keys(params).length) {
        stringifiedParams = `?${stringify(params)}`;
      }
      return `/export/${type}${stringifiedParams}`;
    }
    return '';
  }

};

/*
|--------------------------------------------------------------------------
| Export singleton
|--------------------------------------------------------------------------
|
| Generates a client singleton as default export.
| We do this to make our functionality super testable...
|
*/

const client = new Client(makeRequest, generateRoute);

client.generateHttpVerbFunctions();

export default client;
