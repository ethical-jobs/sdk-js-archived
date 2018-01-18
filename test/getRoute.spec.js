import Api from '..';

describe('getRoute function', () => {

  test('should be a function', () => {
    expect(Api.getRoute).toBeInstanceOf(Function);
  });

  test('should pass route back for not-GET requests', () => {
    ['POST','PUT','PATCH','DELETE',]
      .forEach(verb => expect(Api.getRoute('/my/mock/route', verb)).toBe('/my/mock/route'));
  });

  test('should build query string for GET requests', () => {
    const params = {
      foo: 'bar',
      red: 'green',
    };
    expect(Api.getRoute('/my/mock/route', 'GET', params))
      .toBe('/my/mock/route?foo=bar&red=green');
  });

  test('should build query string from Immutable structures', () => {
    const params = {
      toJS: () => ({
        uni: 'corn',
        simon: 'says',
      }),
    };
    expect(Api.getRoute('/my/mock/route', 'GET', params))
      .toBe('/my/mock/route?simon=says&uni=corn');
  });


  // test('should have correct defaults', () => {
  //   expect(Api.getParams()).toEqual({
  //     method: 'get',
  //     timeout: 15000, // ?? works with fetch?
  //     body: null,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //   });
  // });

  // test('should be able to set the verb', () => {
  //   expect(Api.getParams('POST')).toMatchObject({
  //     method: 'POST',
  //   });
  // });

  // test('should not send params in body on get request', () => {
  //   const params = { foo: 'bar', bar: 'foo' };
  //   expect(Api.getParams('get', params)).toMatchObject({
  //       body: null,
  //   });
  // });

});
