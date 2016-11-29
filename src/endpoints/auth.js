/**
 * ...
 *
 * @return Promise
 */

export function login({ login, password }) {
  return this.post('/auth/login', { login, password });
}

/**
 * ...
 *
 * @return Promise
 */

export function logout() {
  return this.get('/auth/logout');
}

/**
 * ...
 *
 * @return Promise
 */

export function load() {
  return this.get('/auth/load');
}

/**
 * ...
 *
 * @return Promise
 */

export function recover({ email }) {
  return this.post('/auth/recover', { email });
}

/**
 * ...
 *
 * @return Promise
 */

export function reset({ username, password, password_confirmation, token }) {
  return this.post('/auth/reset', { username, password, password_confirmation, token });
}
