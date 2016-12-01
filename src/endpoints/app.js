/**
 * Fetches initial application data: taxonomies, enumerables and credit packs
 *
 * @public
 * @return {Promise}
 */

export function initialize() {
  return this.get('/app/initialize', {});
}

