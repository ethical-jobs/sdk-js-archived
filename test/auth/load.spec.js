import sinon from 'sinon';
import mockToken from '../mocks/mockToken';
import Api from '../..';

describe('load helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'get').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.get.restore();
  });

  test('should use the correct HTTP verb', () => {
    localStorage.setItem('_token', mockToken);
    Api.auth.load();
    expect(Api.get.calledOnce).toBe(true);
  });

  test('should get correct token in api endpoint', () => {
    localStorage.setItem('_token', mockToken);
    Api.auth.load();
    expect(Api.get.args[0][0]).toBe(`/users/5151`);
  });

  test('should catch invalid tokens and look for non-existing user', () => {
    const invalidToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM5NDRjNTUwNzU1NzQ2MzcxNWQ5YjBjZWYyNzUwZmFjMTc5M2Y5MDRlYjhlMTc5NTg4ZmY1ZTAwZTE4YWJhZGVjZDMzNDQzOTY5MzhjOWE4In0';
    localStorage.setItem('_token', invalidToken);
    Api.auth.load();
    expect(Api.get.args[0][0]).toBe(`/users/-1`);
  });
});