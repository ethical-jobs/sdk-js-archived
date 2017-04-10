import 'isomorphic-fetch';
import sinon from 'sinon';
import { Client } from '..';

describe('dispatchRequest function', () => {

  const api = new Client();

  beforeEach(() => {
    sinon.stub(window, 'fetch').resolves({
      status: 200,
      ok: true,
      json: { foo: 'bar' },
    });
  });

  afterEach(() => {
    window.fetch.restore();
  });  

  test('calls fetch only once', () => {
    api.get('/jobs', { foo: 'bar' });
    api.post('/jobs', { foo: 'bar' });
    api.put('/jobs', { foo: 'bar' });
    api.patch('/jobs', { foo: 'bar' });
    api.delete('/jobs', { foo: 'bar' });
    expect(window.fetch.callCount).toBe(5);
  });

  test('parses OK response correctly', () => {
    api.get('/jobs', { foo: 'bar' }).then(response => expect(response).toEqual({ foo: 'bar' }));
  });  

  test('calls fetch with correct url', () => {
    api.get('/jobs', { foo: 'bar' });
    expect(window.fetch.args[0][0]).toBe('http://api.ethicaljobs.com.au/jobs?foo=bar');
    api.post('/jobs', { foo: 'bar' });
    expect(window.fetch.args[1][0]).toBe('http://api.ethicaljobs.com.au/jobs');    
    api.put('/jobs', { foo: 'bar' });
    expect(window.fetch.args[2][0]).toBe('http://api.ethicaljobs.com.au/jobs');    
    api.patch('/jobs', { foo: 'bar' });
    expect(window.fetch.args[3][0]).toBe('http://api.ethicaljobs.com.au/jobs');    
    api.delete('/jobs', { foo: 'bar' });
    expect(window.fetch.args[4][0]).toBe('http://api.ethicaljobs.com.au/jobs');    
  });  

  test('calls fetch with correct params', () => {
    const expected = {
        "headers": {
            "Content-Type": "application/json"
        }, 
        "timeout": 3500
    };

    api.get('/jobs', { foo: 'bar' });
    expect(window.fetch.args[0][1]).toMatchObject(expected); 
    expect(window.fetch.args[0][1]).toMatchObject({
      body: null,
      method: 'get',
    }); 
    
    api.post('/jobs', { foo: 'bar' });
    expect(window.fetch.args[1][1]).toMatchObject(expected); 
    expect(window.fetch.args[1][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'post',
    }); 

    api.put('/jobs', { foo: 'bar' });
    expect(window.fetch.args[2][1]).toMatchObject(expected); 
    expect(window.fetch.args[2][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'put',
    });     

    api.patch('/jobs', { foo: 'bar' });
    expect(window.fetch.args[3][1]).toMatchObject(expected); 
    expect(window.fetch.args[3][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'patch',
    });    

    api.delete('/jobs', { foo: 'bar' });
    expect(window.fetch.args[4][1]).toMatchObject(expected); 
    expect(window.fetch.args[4][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'delete',
    });                         
  });    

});
