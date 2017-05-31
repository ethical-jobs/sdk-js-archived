import Api from '..';

describe('checkForToken function', () => {

  test('should be a function', () => {
    expect(Api.checkForToken).toBeInstanceOf(Function);
  });

  test('should set token into local storage', () => {
    const response = {
      meta: {
        token: 'MOCK-TOKEN-STRING',
      }
    };
    Api.checkForToken(response);
    expect(localStorage.getItem('_token')).toBe('MOCK-TOKEN-STRING');
  });

  test('should pass response object back', () => {
    const response = {
      meta: {
        token: 'MOCK-TOKEN-STRING',
      }
    };
    expect(Api.checkForToken(response)).toEqual(response);
  });
});
