import sinon from 'sinon';
import 'isomorphic-fetch';
import { Client } from '..';

const resolvesWith = {
  foo: 'bar',
};

describe('Client HTTP verb functions', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'dispatchRequest').returns(resolvesWith);
  });

  afterEach(() => {
    api.dispatchRequest.restore();
  });

  test('should have all the HTTP verbs', () => {
    expect(api.get).toBeInstanceOf(Function);
    expect(api.post).toBeInstanceOf(Function);
    expect(api.patch).toBeInstanceOf(Function);
    expect(api.put).toBeInstanceOf(Function);
    expect(api.delete).toBeInstanceOf(Function);
  });

  test('should have HTTP methods that return the value from dispatchRequest', () => {
    expect(api.get()).toEqual(resolvesWith);
    expect(api.post()).toEqual(resolvesWith);
    expect(api.patch()).toEqual(resolvesWith);
    expect(api.put()).toEqual(resolvesWith);
    expect(api.delete()).toEqual(resolvesWith);
  });

});
