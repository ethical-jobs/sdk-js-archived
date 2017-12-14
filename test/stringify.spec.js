import stringify from '../src/stringify';

describe('stringify function', () => {

  test('Arrays should be stringified into url array syntax', () => {
    const params = {
      anArray: ['foo','bar','bam'],
    };
    expect(stringify(params)).toBe('anArray[]=foo&anArray[]=bar&anArray[]=bam');
  });

  test('False values should be 0', () => {
    const params = {
      expired: false,
    };
    expect(stringify(params)).toBe('expired=0');
  });

  test('True values should be 1', () => {
    const params = {
      expired: true,
    };
    expect(stringify(params)).toBe('expired=1');
  });
});

