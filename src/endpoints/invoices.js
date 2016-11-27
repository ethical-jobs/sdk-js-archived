import client from 'client';

/**
 * ...
 *
 * @return Promise
 */
export function fetchInvoice({ id, organisationId = null, ...params }) {
  return client.get(`/invoice/${id}`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function fetchInvoices({ organisationId = null, ...params } = {}) {
  return client.get('/invoices', { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function createInvoice({ organisation_id, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/invoice/create`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function updateInvoice({ id, organisation_id, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/invoice/${id}/update`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function archiveInvoice({ id, organisation_id, restore = false, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/invoice/${id}/${restore ? 'restore' : 'delete'}`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function payInvoice({ id, organisation_id, markAsUnPaid = false, ...params }) {
  const organisationId = organisation_id;
  return client.post(`/invoice/${id}/${markAsUnPaid ? 'unpaid' : 'paid'}`, { organisationId, ...params });
}

/**
 * ...
 *
 * @return Promise
 */

export function purchaseCredits({ organisationId, ...params }) {
  return client.post('/credits/purchase', { organisationId, ...params });
}
