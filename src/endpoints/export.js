/**
 * ...
 *
 * @return Promise
 */

export function exportUrl({ type, ...rest }) {
  return this.link(type, rest);
}
