import client from 'client';

/**
 * ...
 *
 * @return Promise
 */
export function fetchJobs({ organisationId = null, jobType = '', ...params } = {}) {
  const jobTypeSegment = jobType ? `/${jobType.toLowerCase()}` : '';
  return client.get(`/jobs${jobTypeSegment}`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */
export function fetchJob({ id, organisationId = null, ...params }) {
  return client.get(`/job/${id}`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function createJob({ organisation_id, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/job/create`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function updateJob({ id, organisation_id, drafting = false, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/job/${id}/update`, { organisationId, drafting, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function approveJob({ id, organisation_id, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/job/${id}/approve`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function expireJob({ id, organisation_id, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/job/${id}/expire`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function archiveJob({ id, organisation_id, restore = false, ...params }) {
  const organisationId = organisation_id;
  const action = restore ? 'restore' : 'delete';
  return client.post(`/job/${id}/${action}`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function attachJobMedia({ id, formData }) {
  return client.post(`/job/${id}/attach`, formData);
}

/**
 * ...
 *
 * @return Promise
 */

export function detachJobMedia({ id, mediaId }) {
  return client.post(`/job/${id}/detach`, { media_id: mediaId });
}
