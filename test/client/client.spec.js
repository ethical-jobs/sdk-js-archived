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

  test('should call getDomain with correct environment', () => {
    sinon.stub(api, 'getDomain');
    api.get();
    expect(api.getDomain.args[0][0]).toBe('production');
    api.getDomain.restore();
  });

  test('should call formatParameters with correct parameters', () => {
    sinon.stub(api, 'formatParameters');
    api.get('/my/route', { organisationId: 123, foo: 'bar' });
    expect(api.formatParameters.args[0][0]).toBe('get');
    expect(api.formatParameters.args[0][1]).toEqual({ organisationId: 123, foo: 'bar' });
    api.formatParameters.restore();
  });

  test('should call dispatchRequest only once', () => {
    api.get();
    expect(api.dispatchRequest.calledOnce).toBe(true);
  });

  test('should call dispatchRequest with correct params', () => {
    api.get('/my/route', { foo: 123, bar: 'bar' });
    expect(api.dispatchRequest.args[0][0]).toBe('//api.ethicaljobs.com.au/my/route?bar=bar&foo=123');
  });  

});
