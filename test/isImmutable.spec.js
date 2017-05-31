import isImmutable from '../src/isImmutable';

describe('isImmutable function', () => {

  test('should be able to loosely detect immutable structures', () => {
    const immutable = { toJS: () => {} };
    expect(isImmutable(immutable)).toBe(true);
  });

  test('should be able to loosely detect un-immutable structures', () => {
    const immutable = { foo: 'bar' };
    expect(isImmutable(immutable)).toBe(false);
  });
});
