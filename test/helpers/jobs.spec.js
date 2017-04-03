import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

// -----------
// approve helper
// ------------------

describe('approve helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'patch').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.patch.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.approve();
    expect(api.patch.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.approve();
    expect(api.patch.args[0][1]).toEqual({ status: 'APPROVED' });
  });  

  test('should have the correct endpoint', () => {
    api.approve(64635);
    expect(api.patch.args[0][0]).toBe(`/jobs/64635`);
  });

  test('should return the correct response', () => {
    return api.approve(72353).then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// attachMedia helper
// ------------------

describe('attachMedia helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'post').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.attachMedia();
    expect(api.post.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.attachMedia(null, { fing: 'fang' });
    expect(api.post.args[0][1]).toEqual({ fing: 'fang' });
  });  

  test('should have the correct endpoint', () => {
    api.attachMedia(64635, { fing: 'fang' });
    expect(api.post.args[0][0]).toBe(`/jobs/64635/attachments`);
  });

  test('should return the correct response', () => {
    return api.attachMedia(64635, { fing: 'fang' }).then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});

// -----------
// detachMedia helper
// ------------------

describe('detachMedia helper', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(api, 'delete').resolves({ foo: 'bar' });
  });

  afterEach(() => {
    api.delete.restore();
  });

  test('should use the correct HTTP verb', () => {
    api.detachMedia();
    expect(api.delete.calledOnce).toBe(true);
  });

  test('should send correct params', () => {
    api.detachMedia(64635, 287);
    expect(api.delete.args[0][1]).toEqual({ });
  });  

  test('should have the correct endpoint', () => {
    api.detachMedia(64635, 287);
    expect(api.delete.args[0][0]).toBe(`/jobs/64635/attachments/287`);
  });

  test('should return the correct response', () => {
    return api.detachMedia(64635, 287).then(response => {
      expect(response).toEqual({ foo: 'bar' });
    });
  });
});