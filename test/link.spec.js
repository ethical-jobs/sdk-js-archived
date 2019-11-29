import Api from '../src';

describe('Client link function', () => {

  test('should be a function', () => {
    expect(Api.link).toBeInstanceOf(Function);
  });

  test('should return correct route when type is specified', () => {
    expect(Api.link('/foo/bar/bam')).toBe('https://api.ethicaljobs.com.au/foo/bar/bam');
  });

  test('should stringify any parameters', () => {
    const params = { name: 'andrew', age: 33, location: 'Bellingen' };
    expect(Api.link('/jobs', params)).toBe('https://api.ethicaljobs.com.au/jobs?age=33&location=Bellingen&name=andrew');
  });

  test('should not stringify an empty object parameter', () => {
    expect(Api.link('jobs', {})).not.toContain('?');
  });

});
