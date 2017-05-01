import Api from '..';

describe('getDomain function', () => {

  test('should be a function', () => {
    expect(Api.getDomain).toBeInstanceOf(Function);
  });

  test('should return production domain by default', () => {
    expect(Api.getDomain()).toBe('http://api.ethicaljobs.com.au');
  });

  test('should return valid production environment domain', () => {
    expect(Api.getDomain('production')).toBe('http://api.ethicaljobs.com.au');
  });

  test('should return valid staging environment domain', () => {
    expect(Api.getDomain('staging')).toBe('http://api.ethicalstaging.com.au');
  });

  test('should return valid development environment domain', () => {
    expect(Api.getDomain('development')).toBe('http://api.ethicaljobs.local');
  });

});
