import 'isomorphic-fetch';
import sinon from 'sinon';
import Api from '../src';

// -----------
// approve helper
// ------------------

describe('approve helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'patch').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.patch.restore()
  });

  test('should use the correct HTTP verb', () => {
    Api.jobs.approve();
    expect(Api.patch.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.jobs.approve();
    expect(Api.patch.args[0][1]).toEqual({ status: 'APPROVED' });
  });

  test('should have the correct endpoint', () => {
    Api.jobs.approve(64635);
    expect(Api.patch.args[0][0]).toBe(`/jobs/64635`);
  });

  test('should return the correct response', () => {
    return Api.jobs.approve(72353).then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});
