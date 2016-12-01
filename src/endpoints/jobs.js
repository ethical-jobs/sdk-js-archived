/**
 * Fetches job collections
 *
 * @public
 * @param {Object} [params={}] request parameters
 * @return {Promise}
 */

export function fetchJobs({ organisationId = null, jobType = '', ...params } = {}) {
  const jobTypeSegment = jobType ? `/${jobType.toLowerCase()}` : '';
  return this.get(`/jobs${jobTypeSegment}`, { organisationId, ...params });
}

/**
 * Fetches a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function fetchJob({ id, organisationId = null, ...params }) {
  return this.get(`/job/${id}`, { organisationId, ...params });
}

/**
 * Creates a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function createJob({ organisation_id, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/job/create`, { organisationId, ...params });
}

/**
 * Updates a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function updateJob({ id, organisation_id, drafting = false, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/job/${id}/update`, { organisationId, drafting, ...params });
}

/**
 * Approves a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function approveJob({ id, organisation_id, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/job/${id}/approve`, { organisationId, ...params });
}

/**
 * Expires a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function expireJob({ id, organisation_id, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/job/${id}/expire`, { organisationId, ...params });
}

/**
 * Archives a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function archiveJob({ id, organisation_id, restore = false, ...params }) {
  const organisationId = organisation_id;
  const action = restore ? 'restore' : 'delete';
  return this.post(`/job/${id}/${action}`, { organisationId, ...params });
}

/**
 * Attaches media to a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function attachJobMedia({ id, formData }) {
  return this.post(`/job/${id}/attach`, formData);
}

/**
 * Removes a media attachment from a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function detachJobMedia({ id, mediaId }) {
  return this.post(`/job/${id}/detach`, { media_id: mediaId });
}
