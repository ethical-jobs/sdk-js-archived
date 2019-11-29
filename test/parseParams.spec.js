import Api from '../src';

describe('parseParams function', () => {

  test('should just return params if FormData', () => {
    expect(Api.parseParams(new FormData)).toEqual(new FormData);
  });

  test('should stringify an object', () => {
    expect(Api.parseParams({ foo: 'bar' })).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  test('should stringify an immutable object', () => {
    const immutable = {
      toJS: () => ({
        foo: 'bar',
        bar: 'foo',
      })
    };
    expect(Api.parseParams(immutable)).toEqual(JSON.stringify({
      foo: 'bar',
      bar: 'foo',
    }));
  });
});
