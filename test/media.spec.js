import sinon from 'sinon';
import Api from '../src';

// -----------
// Upload helper
// ------------------

describe('Upload helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({});
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.upload(mockFile);
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should have the correct endpoint', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.upload(mockFile);
    expect(Api.post.args[0][0]).toBe(`/media`);
  });

  test('should create a FormData file object', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.upload(mockFile);
    expect(Api.post.args[0][1]).toBeInstanceOf(FormData);
  });

  test('should create append FormData to correct key', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.upload(mockFile);
    expect(Api.post.args[0][1].has('media')).toBe(true);
  });

});

// -----------
// Attach helper
// ------------------

describe('Attach helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'post').resolves({});
  });

  afterEach(() => {
    Api.post.restore();
  });

  test('should use the correct HTTP verb', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.attach(mockFile, 'jobs', 22);
    expect(Api.post.calledOnce).toBe(true);
  });

  test('should have the correct endpoint', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.attach(mockFile, 'jobs', 22);
    expect(Api.post.args[0][0]).toBe(`/media/jobs/22`);
  });

  test('should create a FormData file object', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.attach(mockFile, 'jobs', 22);
    expect(Api.post.args[0][1]).toBeInstanceOf(FormData);
  });

  test('should create append FormData to correct key', () => {
    const mockFile = new File([''], 'mock-upload.txt');
    Api.media.attach(mockFile, 'jobs', 22);
    expect(Api.post.args[0][1].has('media')).toBe(true);
  });

});

// -----------
// Detach helper
// ------------------

describe('Detach helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'delete').resolves({});
  });

  afterEach(() => {
    Api.delete.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.media.detach(10, 'jobs');
    expect(Api.delete.calledOnce).toBe(true);
  });

  test('should have the correct endpoint', () => {
    Api.media.detach(10, 'jobs');
    expect(Api.delete.args[0][0]).toBe(`/media/10/jobs`);
  });

});


// -----------
// Delete helper
// ------------------

describe('Delete helper', () => {

  beforeEach(() => {
    sinon.stub(Api, 'delete').resolves({});
  });

  afterEach(() => {
    Api.delete.restore();
  });

  test('should use the correct HTTP verb', () => {
    Api.media.delete(22);
    expect(Api.delete.calledOnce).toBe(true);
  });

  test('should have the correct endpoint', () => {
    Api.media.delete(22);
    expect(Api.delete.args[0][0]).toBe(`/media/22`);
  });

});