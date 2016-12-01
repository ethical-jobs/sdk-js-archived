/**
 * Sign in a user
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function login({ login, password }) {
  return this.post('/auth/login', { login, password });
}

/**
 * Sign out a user
 *
 * @public
 * @return {Promise}
 */

export function logout() {
  return this.get('/auth/logout');
}

/**
 * Loads a user entity from JWT token
 *
 * @public
 * @return {Promise}
 */

export function load() {
  return this.get('/auth/load');
}

/**
 * Dispatches a password recovery request
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function recover({ email }) {
  return this.post('/auth/recover', { email });
}

/**
 * Resets a users password, from a reset token
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

export function reset({ username, password, password_confirmation, token }) {
  return this.post('/auth/reset', { username, password, password_confirmation, token });
}
