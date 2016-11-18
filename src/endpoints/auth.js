import client from 'client';

/**
 * ...
 *
 * @return Promise
 */

export function login({ login, password }) {
  return client.post('/auth/login', { login, password });
}

/**
 * ...
 *
 * @return Promise
 */

export function logout() {
  return client.get('/auth/logout');
}

/**
 * ...
 *
 * @return Promise
 */

export function load() {
  return client.get('/auth/load');
}

/**
 * ...
 *
 * @return Promise
 */

export function recover({ email }) {
  return client.post('/auth/recover', { email });
}

/**
 * ...
 *
 * @return Promise
 */

export function reset({ username, password, password_confirmation, token }) {
  return client.post('/auth/reset', { username, password, password_confirmation, token });
}


