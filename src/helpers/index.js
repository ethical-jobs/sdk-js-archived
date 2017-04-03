import auth from 'helpers/auth';
import jobs from 'helpers/jobs';

/**
 * Fetches initial application data: taxonomies, enumerables and credit packs
 *
 * @public
 * @return {Promise}
 */

function initialize() {
  return this.get('/', {});
}

/**
 * Returns an export to CSV url
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {String}
 */

function exportUrl(resource, params) {
  return this.link(`/exports/csv/${resource}`, params);
}

export default {
    ...auth,
    ...jobs,
    initialize,
    exportUrl,
};
