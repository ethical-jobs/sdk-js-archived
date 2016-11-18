import client from 'client';

/**
 * ...
 *
 * @return Promise
 */

export function initialize() {
  return client.get('/app/initialize', {});
}

