import Api from '../..';

describe('logout helper', () => {

  test('it removes token from the store', () => {
    localStorage.setItem('_token', 'mock-jwt-token');
    localStorage.setItem('refresh_token', 'mock-jwt-token');
    Api.auth.logout();
    expect(localStorage.getItem('_token')).toBeUndefined();
    expect(localStorage.getItem('refresh_token')).toBeUndefined();
  });
});