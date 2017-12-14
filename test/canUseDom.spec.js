import canUseDom from '../src/canUseDom';

describe('canUseDom function', () => {

  test('should detect dom', () => {
    expect(canUseDom()).toBe(true);
  });
});
