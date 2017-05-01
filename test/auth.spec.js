import sinon from 'sinon';
import Api from '..';

// -----------
// Login helper
// ------------------

describe('Login helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({
      meta: {
        token: 'mock-jwt-token-string',
      },
    });
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.auth.login();
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.auth.login({ login: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(Api.post.args[0][1]).toEqual({ login: 'andrewmclagan', password: 'GiantSwampMattress' });
  });

  test('should set token into local storage', () => {
    return Api.auth.login().then(response => {
      expect(localStorage.getItem('_token')).toBe('mock-jwt-token-string');
    });
  });

  test('should have the correct endpoint', () => {
    Api.auth.login();
    expect(Api.post.args[0][0]).toBe(`/users/token`);
  });

  test('should return the correct response', () => {
    return Api.auth.login().then(response => {
      expect(response).toEqual({
        meta: {
          token: 'mock-jwt-token-string',
        },
      });
    });
  });
});

// -----------
// Login helper
// ------------------

describe('logout helper', () => {

  test('it removes token from the store', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    Api.auth.logout();
    expect(localStorage.getItem('_token')).toBeUndefined();
  });
});

// -----------
// Load auth helper
// ------------------

describe('load helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'get').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.get.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.auth.load();
    expect(Api.get.calledOnce).toBe(true);
  });

  test('should get correct token in api endpoint', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    Api.auth.load();
    expect(Api.get.args[0][0]).toBe(`/users/token/mock-jwt-token`);
  });
});


// -----------
// recoverPassword helper
// ------------------

describe('recoverPassword helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.auth.recoverPassword();
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.auth.recoverPassword('andrew@ethicaljobs.com.au');
    expect(Api.post.args[0][1]).toEqual({ email: 'andrew@ethicaljobs.com.au' });
  });

  test('should have the correct endpoint', () => {
    Api.auth.recoverPassword();
    expect(Api.post.args[0][0]).toBe(`/users/token/recover`);
  });

  test('should return the correct response', () => {
    return Api.auth.recoverPassword().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// resetPassword helper
// ------------------

describe('resetPassword helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.auth.resetPassword();
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.auth.resetPassword({ foo: 'bar' });
    expect(Api.post.args[0][1]).toEqual({ foo: 'bar' });
  });

  test('should have the correct endpoint', () => {
    Api.auth.resetPassword();
    expect(Api.post.args[0][0]).toBe(`/auth/reset`);
  });

  test('should return the correct response', () => {
    return Api.auth.resetPassword().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});
