import Api from '../src';

describe('getParamsBody function', () => {

  test('should be a function', () => {
    expect(Api.getParamsBody).toBeInstanceOf(Function);
  });

  test('should not send params in body on GET request', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(Api.getParamsBody('get', params)).toBeUndefined();
  });

  test('should not send params in body on HEAD request', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(Api.getParamsBody('head', params)).toBeUndefined();
  });

  test('should send params in body on POST request as a string', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(Api.getParamsBody('post', params)).toMatch("{\"foo\":\"bar\",\"bar\":\"foo\"}");
  });
});
