import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

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
    api.login();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.login({ login: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(api.post.args[0][1]).toEqual({ login: 'andrewmclagan', password: 'GiantSwampMattress' });
  });

  test('should set token into local storage', () => {
    return api.login().then(response => {
      expect(localStorage.getItem('_token')).toBe('mock-jwt-token-string');
    });
  });  

  test('should have the correct endpoint', () => {
    api.login();
    expect(api.post.args[0][0]).toBe(`/users/token`);
  });

  test('should return the correct response', () => {
    return api.login().then(response => {
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
    api.logout();
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
    api.load();
    expect(api.get.calledOnce).toBe(true);
  });

  test('should get correct token in api endpoint', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    api.load();
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
    api.recoverPassword();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.recoverPassword('andrew@ethicaljobs.com.au');
    expect(api.post.args[0][1]).toEqual({ email: 'andrew@ethicaljobs.com.au' });
  });  

  test('should have the correct endpoint', () => {
    api.recoverPassword();
    expect(api.post.args[0][0]).toBe(`/users/token/recover`);
  });

  test('should return the correct response', () => {
    return api.recoverPassword().then(response => {
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
    api.resetPassword();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.resetPassword({ foo: 'bar' });
    expect(api.post.args[0][1]).toEqual({ foo: 'bar' });
  });  

  test('should have the correct endpoint', () => {
    api.resetPassword();
    expect(api.post.args[0][0]).toBe(`/auth/reset`);
  });

  test('should return the correct response', () => {
    return api.resetPassword().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});
