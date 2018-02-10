import sinon from 'sinon';
import Api from '../..';

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