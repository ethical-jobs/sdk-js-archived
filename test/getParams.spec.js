import Api from '..';

describe('getParams function', () => {

  test('should be a function', () => {
    expect(Api.getParams).toBeInstanceOf(Function);
  });

  test('should have correct defaults', () => {
    expect(Api.getParams()).toEqual({
      method: undefined,
      timeout: 3500, // ?? works with fetch?
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('should be able to set the verb', () => {
    expect(Api.getParams('POST')).toMatchObject({
      method: 'POST',
    });
  });

  test('should strigify params', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(Api.getParams('POST', params)).toMatchObject({
        body: JSON.stringify(params),
    });
  });

  test('should have correct headers', () => {
    expect(Api.getParams('POST')).toMatchObject({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

});
