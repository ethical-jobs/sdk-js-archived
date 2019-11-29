import Api from '../src';

describe('getHeaders function', () => {

  afterEach(() => {
    localStorage.clear();
  });  

  test('should ommit json headers if FormData params present', () => {
    localStorage.setItem('_token', 'MOCK-JWT-TOKEN');
    const notToHave = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',      
    };
    expect(Api.getHeaders(new FormData))
      .toEqual(expect.not.objectContaining(notToHave));
  });

  test('should have auth header if FormData params present', () => {
    localStorage.setItem('_token', 'MOCK-JWT-TOKEN');
    expect(Api.getHeaders(new FormData))
      .toEqual({
        'Authorization': 'Bearer MOCK-JWT-TOKEN',
      });
  });  

  test('should return correct headers with params', () => {
    expect(Api.getHeaders({ foo: 'bar' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '',
    });
  });

  test('should return correct headers with auth', () => {
    localStorage.setItem('_token', 'MOCK-JWT-TOKEN');
    expect(Api.getHeaders({ foo: 'bar' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer MOCK-JWT-TOKEN',
    });
  });

  test('should merge headers without params', () => {
    expect(Api.getHeaders({}, { foobar: 'barfoo' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '',
      'foobar': 'barfoo',
    });
  });  

  test('should merge headers with params', () => {
    expect(Api.getHeaders({ fickle: 'feline' }, { foobar: 'barfoo' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '',
      'foobar': 'barfoo',
    });
  });    

  test('should merge headers with params and auth', () => {
    localStorage.setItem('_token', 'MOCK-JWT-TOKEN');
    expect(Api.getHeaders({ fickle: 'feline' }, { foobar: 'barfoo' })).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer MOCK-JWT-TOKEN',
      'foobar': 'barfoo',
    });
  });      
});
