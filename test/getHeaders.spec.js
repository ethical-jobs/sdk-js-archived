import Api from '..';

describe('getHeaders function', () => {

  test('should return no headers if FormData params present', () => {
    expect(Api.getHeaders(new FormData)).toBe(undefined);
  });

  test('should return correct headers with normal params', () => {
    expect(Api.getHeaders({ foo: 'bar' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '',
    });
  });

  test('should return correct headers with auth params', () => {
    localStorage.setItem('_token', 'MOCK-JWT-TOKEN');
    expect(Api.getHeaders({ foo: 'bar' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer MOCK-JWT-TOKEN',
    });
  });
});
