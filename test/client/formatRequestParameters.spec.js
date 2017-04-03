import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

describe('formatRequestParameters function', () => {

  const api = new Client();

  test('should be a function', () => {
    expect(api.formatRequestParameters).toBeInstanceOf(Function);
  });

  test('should have correct defaults', () => {
    expect(api.formatRequestParameters()).toEqual({
      method: undefined,
      timeout: 3500, // ?? works with fetch?
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('should be able to set the verb', () => {
    expect(api.formatRequestParameters('POST')).toMatchObject({
        method: 'POST',
    });
  });

  test('should strigify params', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(api.formatRequestParameters('POST', params)).toMatchObject({
        body: JSON.stringify({
            ...params,
        }),
    });
  }); 

  test('should have correct headers', () => {
    expect(api.formatRequestParameters('POST')).toMatchObject({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });   

});
