import client from 'client';

/**
 * ...
 *
 * @return Promise
 */

export function exportUrl({ type, ...rest }) {
  return client.link(type, rest);
}
