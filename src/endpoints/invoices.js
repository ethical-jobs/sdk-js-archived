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
  return client.post(`/organisation/${organisation_id}/invoice/create`, params);
}

/**
 * ...
 *
 * @return Promise
 */

export function updateInvoice({ id, organisation_id, ...params }) {
  return client.post(`/organisation/${organisation_id}/invoice/${id}/update`, params);
}

/**
 * ...
 *
 * @return Promise
 */

export function archiveInvoice({ id, organisation_id, restore = false, ...params }) {
  return client.post(`/organisation/${organisation_id}/invoice/${id}/${restore ? 'restore' : 'delete'}`, params);
}

/**
 * ...
 *
 * @return Promise
 */

export function payInvoice({ id, organisation_id, markAsUnPaid = false, ...params }) {
  return client.post(`/organisation/${organisation_id}/invoice/${id}/${markAsUnPaid ? 'unpaid' : 'paid'}`, params);
}

/**
 * ...
 *
 * @return Promise
 */

export function purchaseCredits({ organisationId, ...params }) {
  return client.post('/credits/purchase', { organisationId, ...params });
}
