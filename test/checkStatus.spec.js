import Api from '../src';

describe('checkStatus function', () => {

  test('should be a function', () => {
    expect(Api.checkStatus).toBeInstanceOf(Function);
  });

  test('should return correctly formed error if not ok', () => {
    const response = {
      status: 401,
      ok: false,
      json: {
        message: "Oh dear...",
        errors: [
          { bar: 'foo' },
          { bar: 'foo' },
          { bar: 'foo' },
        ],
      },
    };
    try {
      Api.checkStatus(response);
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.errors).toEqual(response.json.errors);
    }
  });
});
