import sinon from 'sinon';
import Api from '..';

// -----------
// Login helper
// ------------------

describe('Login helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({
      meta: {
        token_type:    'Bearer',
        expires_in:    3600,
        access_token:  'mock-jwt-token-string',
        refresh_token: null,
      },
    });
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(Api.post.args[0][1]).toEqual({
      username: 'andrewmclagan',
      password: 'GiantSwampMattress',
      grant_type: 'password',
      client_id: '2',
      client_secret: null,
      scope: '*',
    });
  });

  test('should have the correct endpoint', () => {
    Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(Api.post.args[0][0]).toBe(`/oauth/token`);
  });

  test('should return the correct response', () => {
    return Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' }).then(response => {
      expect(response).toEqual({
        "meta": {
          "access_token": "mock-jwt-token-string",
          "expires_in": 3600,
          "refresh_token": null,
          "token_type": "Bearer"
        }
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

  // {
  //   aud: '2',
  //   jti: '37756047a0cd099f250f8d39a337dbadaa673c1c23698b910d31f1b7cf36e7fa5fa81b0b0b8357ab',
  //   iat: 1518109567,
  //   nbf: 1518109567,
  //   exp: 1549645567,
  //   sub: '5151',
  //   scopes: []
  // }
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3NzU2MDQ3YTBjZDA5OWYyNTBmOGQzOWEzMzdkYmFkYWE2NzNjMWMyMzY5OGI5MTBkMzFmMWI3Y2YzNmU3ZmE1ZmE4MWIwYjBiODM1N2FiIn0.eyJhdWQiOiIyIiwianRpIjoiMzc3NTYwNDdhMGNkMDk5ZjI1MGY4ZDM5YTMzN2RiYWRhYTY3M2MxYzIzNjk4YjkxMGQzMWYxYjdjZjM2ZTdmYTVmYTgxYjBiMGI4MzU3YWIiLCJpYXQiOjE1MTgxMDk1NjcsIm5iZiI6MTUxODEwOTU2NywiZXhwIjoxNTQ5NjQ1NTY3LCJzdWIiOiI1MTUxIiwic2NvcGVzIjpbXX0.GfRzS-TEpKF6TSKjIb5fZvBEZyt9wM4cRp_GzkOrtUxghIBWj_xytZdy5L2RW3BGTCV5g4VnjuUZb6RWptmaR0gv26JQ67Lb92kFuPdT983jR9vfMbumJ7NjjKa_y99jFSBNnyLmpTglDq2luk1vAFE_v5U0gzZi_MfuAbXj7ciGUx_oJH9p3gJumdOzkA2s7hxUow6Oi7_v9lYLW4qW8f9Qvg-GBaiCE3TgMQafnZ3IZVLI1wfw0lPc_S3ZTz9dsc8zrfmJ67PPGWL7N3iKCfJp1UbsLCFKihgh9aTVZqOqb1_orVhHrI_hu2EAxFsitofCHDpRjMgWSgL8eqlPXLVhspATu6oN1GiWD8z7p2e6txEnGsSMGeBHxA5t9qgMevPB3R9YI7YwjLo-DuOizY1XuOOADxP5fKARR8YAjwAXDz_M9iRMWesHjtRTPtGy63WVlM08dUiS9dHtOKpP_rVfvsthxch7yUE1AFTf551iXtP0XOIKVQXeD90axq__9hnWqYsM9G6ZysmAyR935O-3b9CYqcXC4-OB0u3PDq7hquhLxjCWUcrgm0YpZF3UNEg-u4CRZuptjHiZetD85TII9N9K26F_fYVPBbtG7eCD874tcz-n3ebSiWAraqdCAz6J39SYD0wCWH9w-9HP1-K_RpAldwUaAoW_5yjlx5Y';

  beforeEach(() => {
    sinon.stub(Api, 'get').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.get.restore();
  });

  test('should use the correct HTTP verb', () => {
    localStorage.setItem('_token', token);
    Api.auth.load();
    expect(Api.get.calledOnce).toBe(true);
  });

  test('should get correct token in api endpoint', () => {
    localStorage.setItem('_token', token);
    Api.auth.load();
    expect(Api.get.args[0][0]).toBe(`/users/5151`);
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
    expect(Api.post.args[0][0]).toBe(`/users/passwords/recover`);
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
    expect(Api.post.args[0][0]).toBe(`/users/passwords/reset`);
  });

  test('should return the correct response', () => {
    return Api.auth.resetPassword().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});
