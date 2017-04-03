
/**
 * Approves a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function approve(id) {
  return this.patch(`/jobs/${id}`, { status: 'APPROVED' });
}

/**
 * Expires a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function expire(id) {
  return this.patch(`/jobs/${id}`, { expires_at: (new Date).getTime() });
}

/**
 * Attaches media to a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function attachMedia(id, formData) {
  return this.post(`/jobs/${id}/attachments`, formData);
}

/**
 * Removes a media attachment from a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function detachMedia(id, attachmentId) {
  return this.delete(`/jobs/${id}/attachments/${attachmentId}`, {});
}

// export with namesapce
export default {
    approve,
    expire,
    attachMedia,
    detachMedia,
};
