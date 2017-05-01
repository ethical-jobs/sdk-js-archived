import 'isomorphic-fetch';
import sinon from 'sinon';
import Api from '..';

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

// -----------
// attachMedia helper
// ------------------

describe('attachMedia helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.jobs.attachMedia();
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.jobs.attachMedia(null, { fing: 'fang' });
    expect(Api.post.args[0][1]).toEqual({ fing: 'fang' });
  });

  test('should have the correct endpoint', () => {
    Api.jobs.attachMedia(64635, { fing: 'fang' });
    expect(Api.post.args[0][0]).toBe(`/jobs/64635/attachments`);
  });

  test('should return the correct response', () => {
    return Api.jobs.attachMedia(64635, { fing: 'fang' }).then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// detachMedia helper
// ------------------

describe('detachMedia helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'delete').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    Api.delete.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.jobs.detachMedia();
    expect(Api.delete.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    Api.jobs.detachMedia(64635, 287);
    expect(Api.delete.args[0][1]).toEqual({ });
  });

  test('should have the correct endpoint', () => {
    Api.jobs.detachMedia(64635, 287);
    expect(Api.delete.args[0][0]).toBe(`/jobs/64635/attachments/287`);
  });

  test('should return the correct response', () => {
    return Api.jobs.detachMedia(64635, 287).then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});