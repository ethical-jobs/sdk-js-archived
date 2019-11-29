import Api from '../src';

describe('getParams function', () => {

  test('should be a function', () => {
    expect(Api.getParams).toBeInstanceOf(Function);
  });

  test('should have correct defaults', () => {
    expect(Api.getParams()).toEqual({
      method: 'GET',
      timeout: 15000, // ?? works with fetch?
      body: undefined,
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

});
