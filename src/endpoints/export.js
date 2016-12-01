/**
 * Returns an export to CSV url
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {String}
 */

export function exportUrl({ type, ...rest }) {
  return this.link(type, rest);
}
