/**
 * Sign in a user
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function login(params) {
  return this.post('/users/token', params)
    .then(response => {
        localStorage.setItem('_token', response && response.meta && response.meta.token);
        return response;
    });
}

/**
 * Sign out a user
 *
 * @public
 * @return {Promise}
 */

function logout() {
  localStorage.removeItem('_token');
}

/**
 * Loads a user entity from JWT token
 *
 * @public
 * @return {Promise}
 */

function load() {
  const token = localStorage.getItem('_token');
  return this.get(`/users/token/${token}`);
}

/**
 * Dispatches a password recovery request
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function recoverPassword(email) {
  return this.post('/users/token/recover', { email });
}

/**
 * Resets a users password, from a reset token
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function resetPassword(params) {
  return this.post('/auth/reset', params);
}

// export with namesapce
export default {
    login,
    logout,
    load,
    recoverPassword,
    resetPassword,
};
