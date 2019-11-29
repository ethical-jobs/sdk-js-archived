import sinon from 'sinon';
import { mockAccessToken, mockRefreshToken } from '../mocks/mockTokens';
import Api from '../../src';

describe('Login helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({
      token_type: 'Bearer',
      expires_in: 3600,
      access_token: mockAccessToken,
      refresh_token: mockRefreshToken,
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
    });
  });

  test('should have the correct endpoint', () => {
    Api.auth.login({ username: 'andrewmclagan', password: 'GiantSwampMattress' });
    expect(Api.post.args[0][0]).toBe(`/auth/login`);
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
      .then(() => {
        expect(localStorage.getItem('_token')).toBe(mockAccessToken);
        expect(localStorage.getItem('refresh_token')).toBe(mockRefreshToken);
      });
  });
});