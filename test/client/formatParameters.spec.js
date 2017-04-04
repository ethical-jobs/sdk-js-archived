import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

describe('formatParameters function', () => {

  const api = new Client();

  test('should be a function', () => {
    expect(api.formatParameters).toBeInstanceOf(Function);
  });

  test('should have correct defaults', () => {
    expect(api.formatParameters()).toEqual({
      method: undefined,
      timeout: 3500, // ?? works with fetch?
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('should be able to set the verb', () => {
    expect(api.formatParameters('POST')).toMatchObject({
        method: 'POST',
    });
  });

  test('should strigify params', () => {
    const params = { foo: 'bar', bar: 'foo' };
    expect(api.formatParameters('POST', params)).toMatchObject({
        body: JSON.stringify({
            ...params,
        }),
    });
  }); 

  test('should have correct headers', () => {
    expect(api.formatParameters('POST')).toMatchObject({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });   

});
