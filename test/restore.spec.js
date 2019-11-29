import sinon from 'sinon';
import Api from '../src';

// -----------
// Upload helper
// ------------------

describe('Restore helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'patch').resolves({});
  });

  afterEach(() => {
    Api.patch.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.restore('jobs', 22);
    expect(Api.patch.calledOnce).toBe(true);
  });

  test('should have the correct endpoint', () => {
    Api.restore('jobs', 22);
    expect(Api.patch.args[0][0]).toBe(`/jobs/22`);
  });

  test('should have the correct params', () => {
    Api.restore('jobs', 22);
    expect(Api.patch.args[0][1]).toEqual({ deleted_at: null });
  });

});
