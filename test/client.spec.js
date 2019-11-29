import sinon from 'sinon';
import 'isomorphic-fetch';
import Api from '../src';

const resolvesWith = {
  foo: 'bar',
};

describe('Client HTTP verb functions', () => {

  beforeEach(() => {
    sinon.stub(Api, 'dispatchRequest').returns(resolvesWith);
  });

  afterEach(() => {
    Api.dispatchRequest.restore();
  });

  test('should have all the HTTP verbs', () => {
    expect(Api.get).toBeInstanceOf(Function);
    expect(Api.post).toBeInstanceOf(Function);
    expect(Api.patch).toBeInstanceOf(Function);
    expect(Api.put).toBeInstanceOf(Function);
    expect(Api.delete).toBeInstanceOf(Function);
  });

  test('should have HTTP methods that return the value from dispatchRequest', () => {
    expect(Api.get()).toEqual(resolvesWith);
    expect(Api.post()).toEqual(resolvesWith);
    expect(Api.patch()).toEqual(resolvesWith);
    expect(Api.put()).toEqual(resolvesWith);
    expect(Api.delete()).toEqual(resolvesWith);
  });

});
