import { Client } from '..';

describe('getDomain function', () => {

  const api = new Client();

  test('should be a function', () => {
    expect(api.getDomain).toBeInstanceOf(Function);
  });

  test('should return production domain by default', () => {
    expect(api.getDomain()).toBe('http://api.ethicaljobs.com.au');
  });

  test('should return valid production environment domain', () => {
    expect(api.getDomain('production')).toBe('http://api.ethicaljobs.com.au');
  });

  test('should return valid test environment domain', () => {
    expect(api.getDomain('test')).toBe('http://api.ethicalstaging.com.au');
  });

  test('should return valid development environment domain', () => {
    expect(api.getDomain('development')).toBe('http://api.ethicaljobs.local');
  });

});
