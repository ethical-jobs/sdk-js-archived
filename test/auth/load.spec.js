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
});