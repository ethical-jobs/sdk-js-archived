import Api from '..';

describe('setTokenFromResponse function', () => {

  test('should be a function', () => {
    expect(Api.setTokenFromResponse).toBeInstanceOf(Function);
  });

  test('should set token into local storage from meta response', () => {
    const response = {
      meta: {
        access_token: 'MOCK-TOKEN-STRING',
        refresh_token: 'MOCK-REFRESH-TOKEN-STRING',
      }
    };
    Api.setTokenFromResponse(response);
    expect(localStorage.getItem('_token')).toBe('MOCK-TOKEN-STRING');
    expect(localStorage.getItem('refresh_token')).toBe('MOCK-REFRESH-TOKEN-STRING');
  });


  test('should set token into local storage from auth response', () => {
    const response = {
      access_token: 'MOCK-TOKEN-STRING',
    };
    Api.setTokenFromResponse(response);
    expect(localStorage.getItem('_token')).toBe('MOCK-TOKEN-STRING');
  });

  test('should pass response object back', () => {
    const response = { user: [], organisation: [] };
    expect(Api.setTokenFromResponse(response)).toEqual(response);
  });
});
