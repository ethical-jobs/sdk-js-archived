import sinon from 'sinon';
import { Client } from '..';

// -----------
// Login helper
// ------------------

describe('Login helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'post').resolves({ 
      meta: {
        token: 'mock-jwt-token-string',
      },
    });
  });

  afterEach(() => {
    api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.auth.login();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.auth.login({ login: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(api.post.args[0][1]).toEqual({ login: 'andrewmclagan', password: 'GiantSwampMattress' });
  });

  test('should set token into local storage', () => {
    return api.auth.login().then(response => {
      expect(localStorage.getItem('_token')).toBe('mock-jwt-token-string');
    });
  });  

  test('should have the correct endpoint', () => {
    api.auth.login();
    expect(api.post.args[0][0]).toBe(`/users/token`);
  });

  test('should return the correct response', () => {
    return api.auth.login().then(response => {
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

  const api = new Client();

  test('it removes token from the store', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    api.auth.logout();
    expect(localStorage.getItem('_token')).toBeUndefined();
  });
});

// -----------
// Load auth helper
// ------------------

describe('load helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'get').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.get.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.auth.load();
    expect(api.get.calledOnce).toBe(true);
  });

  test('should get correct token in api endpoint', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    api.auth.load();
    expect(api.get.args[0][0]).toBe(`/users/token/mock-jwt-token`);
  });  
});


// -----------
// recoverPassword helper
// ------------------

describe('recoverPassword helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'post').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.auth.recoverPassword();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.auth.recoverPassword('andrew@ethicaljobs.com.au');
    expect(api.post.args[0][1]).toEqual({ email: 'andrew@ethicaljobs.com.au' });
  });  

  test('should have the correct endpoint', () => {
    api.auth.recoverPassword();
    expect(api.post.args[0][0]).toBe(`/users/token/recover`);
  });

  test('should return the correct response', () => {
    return api.auth.recoverPassword().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// resetPassword helper
// ------------------

describe('resetPassword helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'post').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.auth.resetPassword();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.auth.resetPassword({ foo: 'bar' });
    expect(api.post.args[0][1]).toEqual({ foo: 'bar' });
  });  

  test('should have the correct endpoint', () => {
    api.auth.resetPassword();
    expect(api.post.args[0][0]).toBe(`/auth/reset`);
  });

  test('should return the correct response', () => {
    return api.auth.resetPassword().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});
