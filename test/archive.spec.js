import sinon from 'sinon';
import Api from '../src';

// -----------
// Upload helper
// ------------------

describe('Archive helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'delete').resolves({});
  });

  afterEach(() => {
    Api.delete.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.archive('jobs', 22);
    expect(Api.delete.calledOnce).toBe(true);
  });

  test('should have the correct endpoint', () => {
    Api.archive('jobs', 22);
    expect(Api.delete.args[0][0]).toBe(`/jobs/22`);
  });

});
