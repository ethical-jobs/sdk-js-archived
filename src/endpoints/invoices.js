/**
 * Fetches an invoice entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function fetchInvoice({ id, organisationId = null, ...params }) {
  return this.get(`/invoice/${id}`, { organisationId, ...params });
}

/**
 * Fetches invoice collection
 *
 * @public
 * @param {Object} [params={}] request parameters
 * @return {Promise}
 */

export function fetchInvoices({ organisationId = null, ...params } = {}) {
  return this.get('/invoices', { organisationId, ...params });
}

/**
 * Creates an invoice entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function createInvoice({ organisation_id, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/invoice/create`, { organisationId, ...params });
}

/**
 * Updates an invoice entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function updateInvoice({ id, organisation_id, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/invoice/${id}/update`, { organisationId, ...params });
}

/**
 * Archives an invoice entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function archiveInvoice({ id, organisation_id, restore = false, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/invoice/${id}/${restore ? 'restore' : 'delete'}`, { organisationId, ...params });
}

/**
 * Marks an invice as paid
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function payInvoice({ id, organisation_id, markAsUnPaid = false, ...params }) {
  const organisationId = organisation_id;
  return this.post(`/invoice/${id}/${markAsUnPaid ? 'unpaid' : 'paid'}`, { organisationId, ...params });
}

/**
 * Purchases credits for an organisation
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function purchaseCredits({ organisationId, ...params }) {
  return this.post('/credits/purchase', { organisationId, ...params });
}
