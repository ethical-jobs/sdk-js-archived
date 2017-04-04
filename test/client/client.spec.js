import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

const willResolveWith = {
  foo: 'bar',
  bar: 'foo', 
  bam: 'wham',
};

describe('Client HTTP verb functions', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'dispatchRequest').returns(willResolveWith);
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
    expect(api.get()).toEqual(willResolveWith);
    expect(api.post()).toEqual(willResolveWith);
    expect(api.patch()).toEqual(willResolveWith);
    expect(api.put()).toEqual(willResolveWith);
    expect(api.delete()).toEqual(willResolveWith);
  });

});
