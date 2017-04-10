import { Client } from '..';

describe('getParams function', () => {

  const api = new Client();

  test('should be a function', () => {
    expect(api.getParams).toBeInstanceOf(Function);
  });

  test('should have correct defaults', () => {
    expect(api.getParams()).toEqual({
      method: undefined,
      timeout: 3500, // ?? works with fetch?
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('should be able to set the verb', () => {
    expect(api.getParams('POST')).toMatchObject({
      method: 'POST',
    });
  });

  test('should strigify params', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(api.getParams('POST', params)).toMatchObject({
        body: JSON.stringify(params),
    });
  }); 

  test('should have correct headers', () => {
    expect(api.getParams('POST')).toMatchObject({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });   

});
