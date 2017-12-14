import sinon from 'sinon';
import Api from '..';

// -----------
// initialize helper
// ------------------

describe('initialize helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'get').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.get.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.initialize();
    expect(Api.get.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.initialize({ foo: 'bar' });
    expect(Api.get.args[0][1]).toEqual({ });
  });

  test('should have the correct endpoint', () => {
    Api.initialize();
    expect(Api.get.args[0][0]).toBe(`/`);
  });

  test('should return the correct response', () => {
    return Api.initialize().then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// exportUrl helper
// ------------------

describe('exportUrl helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'link').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.link.restore();
  });

  test('should call link function', () => {
    Api.exportUrl();
    expect(Api.link.calledOnce).toBe(true);
  });

  test('should call link with correct params', () => {
    Api.exportUrl('jobs', { foo: 'bar'});
    expect(Api.link.args[0][0]).toEqual('/exports/csv/jobs');
    expect(Api.link.args[0][1]).toEqual({ foo: 'bar'});
  });
});
