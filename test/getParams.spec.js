import Api from '..';

describe('getParams function', () => {

  test('should be a function', () => {
    expect(Api.getParams).toBeInstanceOf(Function);
  });

  test('should have correct defaults', () => {
    expect(Api.getParams()).toEqual({
      method: 'GET',
      timeout: 3500, // ?? works with fetch?
      body: null,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '',
      },
    });
  });

  test('should be able to set the verb', () => {
    expect(Api.getParams('POST')).toMatchObject({
      method: 'POST',
    });
  });

  test('should not send params in body on get request', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(Api.getParams('get', params)).toMatchObject({
        body: null,
    });
  });

});
