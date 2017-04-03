import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

// -----------
// initialize helper
// ------------------

describe('initialize helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'get').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.get.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.initialize();
    expect(api.get.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.initialize({ foo: 'bar' });
    expect(api.get.args[0][1]).toEqual({ });
  });  

  test('should have the correct endpoint', () => {
    api.initialize();
    expect(api.get.args[0][0]).toBe(`/`);
  });

  test('should return the correct response', () => {
    return api.initialize().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// exportUrl helper
// ------------------

describe('exportUrl helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'link').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.link.restore();
  });

  test('should call link function', () => {
    api.exportUrl();
    expect(api.link.calledOnce).toBe(true);
  });

  test('should call link with correct params', () => {
    api.exportUrl('jobs', { foo: 'bar'});
    expect(api.link.args[0][0]).toEqual('/exports/csv/jobs');
    expect(api.link.args[0][1]).toEqual({ foo: 'bar'});
  });  
});
