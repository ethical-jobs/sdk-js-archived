import { isImmutable, fromImmutable } from '../src/immutable';

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

describe('fromImmutable function', () => {

  test('should be able to convert immutable structures', () => {
    const immutable = { toJS: () => ({ iam: 'immutable' }) };
    expect(fromImmutable(immutable)).toEqual({ iam: 'immutable' });
  });

  test('should return object when its not an immutable structure', () => {
    const immutable = { iam: 'not-immutable' };
    expect(fromImmutable(immutable)).toEqual({ iam: 'not-immutable' });
  });
});
