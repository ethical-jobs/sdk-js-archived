import sinon from 'sinon';
import Api from '..';

const willResolveWith = {
  foo: 'bar',
};

// ---
// GET verb
// -----------------

describe('GET requests', () => {

  beforeEach(() => {
    sinon.stub(Api, 'dispatchRequest').returns(willResolveWith);
  });

  afterEach(() => {
    Api.dispatchRequest.restore();
  });

  test('should call dispatch only once', () => {
    Api.get('/my/cool/route');
    expect(Api.dispatchRequest.calledOnce).toBe(true);
  });

  test('should use the correct HTTP verb', () => {
    Api.get('/my/cool/route');
    expect(Api.dispatchRequest.args[0][0]).toBe('get');
  });

  test('should call dispatch with correct route', () => {
    Api.get('/my/cool/route');
    expect(Api.dispatchRequest.args[0][1]).toBe('/my/cool/route');
  });

  test('should send correct params', () => {
    Api.get('/my/cool/route', { foo: 'bar', funy: 'music'});
    expect(Api.dispatchRequest.args[0][2]).toEqual({ foo: 'bar', funy: 'music'});
  });

  test('should send correct headers', () => {
    Api.get('/my/cool/route', {}, { foo: 'bar', fooby: 'fun'});
    expect(Api.dispatchRequest.args[0][3]).toEqual({ foo: 'bar', fooby: 'fun'});
  });  

  test('should return the correct response', () => {
    return expect(Api.get('/my/cool/route')).toEqual(willResolveWith);
  });

});

// ---
// POST verb
// -----------------

describe('POST requests', () => {

  beforeEach(() => {
    sinon.stub(Api, 'dispatchRequest').returns(willResolveWith);
  });

  afterEach(() => {
    Api.dispatchRequest.restore();
  });

  test('should call dispatch only once', () => {
    Api.post('/my/cool/route');
    expect(Api.dispatchRequest.calledOnce).toBe(true);
  });

  test('should use the correct HTTP verb', () => {
    Api.post('/my/cool/route');
    expect(Api.dispatchRequest.args[0][0]).toBe('post');
  });

  test('should call dispatch with correct route', () => {
    Api.post('/my/cool/route');
    expect(Api.dispatchRequest.args[0][1]).toBe('/my/cool/route');
  });

  test('should send correct params', () => {
    Api.post('/my/cool/route', { foo: 'bar', funy: 'music'});
    expect(Api.dispatchRequest.args[0][2]).toEqual({ foo: 'bar', funy: 'music'});
  });

  test('should send correct headers', () => {
    Api.post('/my/cool/route', {}, { foo: 'bar', fooby: 'fun'});
    expect(Api.dispatchRequest.args[0][3]).toEqual({ foo: 'bar', fooby: 'fun'});
  });    

  test('should return the correct response', () => {
    return expect(Api.post('/my/cool/route')).toEqual(willResolveWith);
  });

});

// ---
// PATCH verb
// -----------------

describe('PATCH requests', () => {

  beforeEach(() => {
    sinon.stub(Api, 'dispatchRequest').returns(willResolveWith);
  });

  afterEach(() => {
    Api.dispatchRequest.restore();
  });

  test('should call dispatch only once', () => {
    Api.patch('/my/cool/route');
    expect(Api.dispatchRequest.calledOnce).toBe(true);
  });

  test('should use the correct HTTP verb', () => {
    Api.patch('/my/cool/route');
    expect(Api.dispatchRequest.args[0][0]).toBe('patch');
  });

  test('should call dispatch with correct route', () => {
    Api.patch('/my/cool/route');
    expect(Api.dispatchRequest.args[0][1]).toBe('/my/cool/route');
  });

  test('should send correct params', () => {
    Api.patch('/my/cool/route', { foo: 'bar', funy: 'music'});
    expect(Api.dispatchRequest.args[0][2]).toEqual({ foo: 'bar', funy: 'music'});
  });

  test('should send correct headers', () => {
    Api.patch('/my/cool/route', {}, { foo: 'bar', fooby: 'fun'});
    expect(Api.dispatchRequest.args[0][3]).toEqual({ foo: 'bar', fooby: 'fun'});
  });    

  test('should return the correct response', () => {
    return expect(Api.patch('/my/cool/route')).toEqual(willResolveWith);
  });

});

// ---
// PUT verb
// -----------------

describe('PUT requests', () => {

  beforeEach(() => {
    sinon.stub(Api, 'dispatchRequest').returns(willResolveWith);
  });

  afterEach(() => {
    Api.dispatchRequest.restore();
  });

  test('should call dispatch only once', () => {
    Api.put('/my/cool/route');
    expect(Api.dispatchRequest.calledOnce).toBe(true);
  });

  test('should use the correct HTTP verb', () => {
    Api.put('/my/cool/route');
    expect(Api.dispatchRequest.args[0][0]).toBe('put');
  });

  test('should call dispatch with correct route', () => {
    Api.put('/my/cool/route');
    expect(Api.dispatchRequest.args[0][1]).toBe('/my/cool/route');
  });

  test('should send correct params', () => {
    Api.put('/my/cool/route', { foo: 'bar', funy: 'music'});
    expect(Api.dispatchRequest.args[0][2]).toEqual({ foo: 'bar', funy: 'music'});
  });

  test('should send correct headers', () => {
    Api.put('/my/cool/route', {}, { foo: 'bar', fooby: 'fun'});
    expect(Api.dispatchRequest.args[0][3]).toEqual({ foo: 'bar', fooby: 'fun'});
  });     

  test('should return the correct response', () => {
    return expect(Api.put('/my/cool/route')).toEqual(willResolveWith);
  });

});

// ---
// DELETE verb
// -----------------

describe('DELETE requests', () => {

  beforeEach(() => {
    sinon.stub(Api, 'dispatchRequest').returns(willResolveWith);
  });

  afterEach(() => {
    Api.dispatchRequest.restore();
  });

  test('should call dispatch only once', () => {
    Api.delete('/my/cool/route');
    expect(Api.dispatchRequest.calledOnce).toBe(true);
  });

  test('should use the correct HTTP verb', () => {
    Api.delete('/my/cool/route');
    expect(Api.dispatchRequest.args[0][0]).toBe('delete');
  });

  test('should call dispatch with correct route', () => {
    Api.delete('/my/cool/route');
    expect(Api.dispatchRequest.args[0][1]).toBe('/my/cool/route');
  });

  test('should send correct params', () => {
    Api.delete('/my/cool/route', { foo: 'bar', funy: 'music'});
    expect(Api.dispatchRequest.args[0][2]).toEqual({ foo: 'bar', funy: 'music'});
  });

  test('should send correct headers', () => {
    Api.delete('/my/cool/route', {}, { foo: 'bar', fooby: 'fun'});
    expect(Api.dispatchRequest.args[0][3]).toEqual({ foo: 'bar', fooby: 'fun'});
  });     

  test('should return the correct response', () => {
    return expect(Api.delete('/my/cool/route')).toEqual(willResolveWith);
  });

});