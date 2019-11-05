import Api from '..';

describe('isUnauthorized function', () => {
  test('should return true on REST authorization error', () => {
    expect(Api.isUnauthorized({ statusCode: 401 })).toBe(true);
  });

  test('should return true on graphql authorization error', () => {
    expect(Api.isUnauthorized({ errors: [{extensions: {category: 'authorization'}}]})).toBe(true);
  });

  test('should return false on empty error', () => {
    expect(Api.isUnauthorized({})).toBe(false);
  });
});
