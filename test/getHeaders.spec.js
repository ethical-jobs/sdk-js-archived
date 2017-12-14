import Api from '..';

describe('getHeaders function', () => {

  afterEach(() => {
    localStorage.clear();
  });  

  test('should return only Auth header if FormData params present', () => {
    localStorage.setItem('_token', 'MOCK-JWT-TOKEN');
    expect(Api.getHeaders(new FormData)).toEqual({
      'Authorization': 'Bearer MOCK-JWT-TOKEN',
    });
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
