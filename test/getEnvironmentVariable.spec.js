import canUseDom from "../src/canUseDom";
import getEnvironmentVariable from '../src/getEnvironmentVariable';

jest.mock('../src/canUseDom');

describe('getEnvironmentVariable function', () => {

  test('Should return default if not found in global scope', () => {
    canUseDom.mockImplementation(() => true);
    expect(getEnvironmentVariable('MY_KEY', 'Default value')).toBe('Default value');
  });

  test('Should return value if key exists on window object', () => {
    canUseDom.mockImplementation(() => true);
    global['MY_KEY'] = 10;
    expect(getEnvironmentVariable('MY_KEY', 'Default value')).toBe(10);
  });

  test('Should return value if key exists on window._env_ object', () => {
    canUseDom.mockImplementation(() => true);
    global['MY_KEY'] = 10;
    global['_env_'] = {
      'MY_KEY': 20
    };
    expect(getEnvironmentVariable('MY_KEY', 'Default value')).toBe(20);
  });

  test('Should return default if not found in node scope', () => {
    canUseDom.mockImplementation(() => false);
    expect(getEnvironmentVariable('NODE_KEY', 'Default node value')).toBe('Default node value');
  });

  test('Should return value if key exists on process.env object and starts with REACT_APP_', () => {
    canUseDom.mockImplementation(() => false);
    process.env.REACT_APP_NODE_KEY = "Hello React App";
    expect(getEnvironmentVariable('NODE_KEY', 'Default value')).toBe("Hello React App");
  });

  test('Should return value if key exists on process.env object', () => {
    canUseDom.mockImplementation(() => false);
    process.env.NODE_KEY = "10";
    process.env.REACT_APP_NODE_KEY = "Hello React App";
    expect(getEnvironmentVariable('NODE_KEY', 'Default value')).toBe("10");
  });

});
