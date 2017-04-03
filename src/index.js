import Client from 'client';
import helpers from 'helpers';

/*
|--------------------------------------------------------------------------
| Assign helper functions to the prototype of the client object
|--------------------------------------------------------------------------
*/

Object.keys(helpers).forEach(key => {
    Client.prototype[key] = helpers[key];
});

export default Client;
