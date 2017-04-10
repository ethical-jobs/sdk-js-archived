import { Client } from '..';

describe('Client link function', () => {

  const api = new Client();

  test('should be a function', () => {
    expect(api.link).toBeInstanceOf(Function);
  });

  test('should return correct route when type is specified', () => {
    expect(api.link('/foo/bar/bam')).toBe('/foo/bar/bam');
  });

  test('should stringify any parameters', () => {
    const params = { name: 'andrew', age: 33, location: 'Bellingen' };
    expect(api.link('/jobs', params)).toBe('/jobs?age=33&location=Bellingen&name=andrew');
  });

  test('should not stringify an empty object parameter', () => {
    expect(api.link('jobs', {})).not.toContain('?');
  });

});
