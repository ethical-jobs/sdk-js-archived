import sinon from 'sinon';
import Api from '../..';

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