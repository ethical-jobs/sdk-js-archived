import Client from 'client';
import * as endpoints from 'endpoints';

/*
|--------------------------------------------------------------------------
| Assign endpoint functions to the prototype of the client object
|--------------------------------------------------------------------------
*/

Object.keys(endpoints).forEach(endpointName => {
  Client.prototype[endpointName] = endpoints[endpointName];
});

export default Client;