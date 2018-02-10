import sinon from 'sinon';
import mockToken from '../mocks/mockToken';
import Api from '../..';

describe('Login helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({
      token_type: 'Bearer',
      expires_in: 3600,
      access_token: mockToken,
      refresh_token: null,
    });
    sinon.stub(Api.auth, 'load').resolves({ user: true });
  });

  afterEach(() => {
    Api.post.restore();
    Api.auth.load.restore();
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
      client_id: null,
      client_secret: null,
      scope: '*',
    });
  });

  test('should have the correct endpoint', () => {
    Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(Api.post.args[0][0]).toBe(`/oauth/token`);
  });

  test('should return the correct response', () => {
    return Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' })
      .then(response => expect(response).toEqual({ user: true }));
  });

  test('should call Api.auth.load once', () => {
    return Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' })
      .then(() => expect(Api.auth.load.calledOnce).toBe(true));
  });

  test('should save token into local storage', () => {
    return Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' })
      .then(() => expect(localStorage.getItem('_token')).toBe(mockToken));
  });
});