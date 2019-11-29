import sinon from 'sinon';
import { mockAccessToken, mockRefreshToken } from '../mocks/mockTokens';
import Api from '../../src';

const response = {
  token_type: 'Bearer',
  expires_in: 3600,
  access_token: mockAccessToken,
  refresh_token: mockRefreshToken,
};

describe('refreshTokens helper', () => {
  describe('refresh request resolves', () => {
    beforeEach(() => {
      sinon.stub(Api, 'performRequest').resolves(response);
      localStorage.setItem('refresh_token', mockRefreshToken);
    });

    afterEach(() => {
      Api.performRequest.restore();
    });

    test('should use the correct HTTP verb', () => {
      Api.auth.refreshTokens();
      expect(Api.performRequest.calledOnce).toBe(true);
    });

    test('should have correct endpoint', () => {
      Api.auth.refreshTokens();
      expect(Api.performRequest.args[0][0]).toBe('post');
      expect(Api.performRequest.args[0][1]).toBe('/auth/refresh');
    });

    test('should return the correct response', () => {
      return Api.auth.refreshTokens()
        .then(data => expect(data).toEqual(response));
    });

    test('should replay the initial request after a successful token refresh', async () => {
      const callback = sinon.spy();
      await Api.auth.refreshTokens(callback);
      expect(callback.calledOnce).toBe(true);
    });
  });

  describe('refresh request rejects', () => {
    beforeEach(() => {
      sinon.stub(Api, 'performRequest').rejects();
    });

    afterEach(() => {
      Api.performRequest.restore();
      Api.auth.logout.restore();
    });

    test('should call logout and throw exception when refresh token is not found in local storage', () => {
      localStorage.setItem('refresh_token', undefined);
      const stub = sinon.stub(Api.auth, 'logout');
      expect(Api.auth.refreshTokens).toThrow();
      expect(stub.called).toBe(true);
    });

    test('should call logout and throw exception when refresh is rejected with 401 status code', async () => {
      localStorage.setItem('refresh_token', 'invalid_token');
      const stub = sinon.stub(Api.auth, 'logout');
      await expect(Api.auth.refreshTokens()).rejects.toThrow();
      expect(stub.called).toBe(true);
    });
  });

  afterEach(() => {
    localStorage.setItem('refresh_token', undefined);
  });
});
