import 'isomorphic-fetch';
import { jsonOkResponseMock } from './mocks/fetchResponseMocks';
import sinon from 'sinon';
import Api from '..';

describe('dispatchRequest function', () => {

  beforeEach(() => {
    sinon.stub(window, 'fetch').returns(
      jsonOkResponseMock({ foo: 'bar' })
    );
  });

  afterEach(() => {
    window.fetch.restore();
  });

    const expectedHeaders = {
        "headers": {
            "Content-Type": "application/json"
        },
        "timeout": 3500
    };

  test('GET calls fetch correctly', () => {
    Api.get('/jobs', { foo: 'bar' });
    expect(window.fetch.calledOnce).toBe(true);
    expect(window.fetch.args[0][0]).toBe('http://api.ethicaljobs.com.au/jobs?foo=bar');
    expect(window.fetch.args[0][1]).toMatchObject(expectedHeaders);
    expect(window.fetch.args[0][1]).toMatchObject({
      body: null,
      method: 'get',
    });
  });

  test('POST calls fetch correctly', () => {
    Api.post('/jobs', { foo: 'bar' });
    expect(window.fetch.calledOnce).toBe(true);
    expect(window.fetch.args[0][0]).toBe('http://api.ethicaljobs.com.au/jobs');
    expect(window.fetch.args[0][1]).toMatchObject(expectedHeaders);
    expect(window.fetch.args[0][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'post',
    });
  });

  test('PUT calls fetch correctly', () => {
    Api.put('/jobs', { foo: 'bar' });
    expect(window.fetch.calledOnce).toBe(true);
    expect(window.fetch.args[0][0]).toBe('http://api.ethicaljobs.com.au/jobs');
    expect(window.fetch.args[0][1]).toMatchObject(expectedHeaders);
    expect(window.fetch.args[0][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'put',
    });
  });

  test('PATCH calls fetch correctly', () => {
    Api.patch('/jobs', { foo: 'bar' });
    expect(window.fetch.calledOnce).toBe(true);
    expect(window.fetch.args[0][0]).toBe('http://api.ethicaljobs.com.au/jobs');
    expect(window.fetch.args[0][1]).toMatchObject(expectedHeaders);
    expect(window.fetch.args[0][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'patch',
    });
  });

  test('DELETE calls fetch correctly', () => {
    Api.delete('/jobs', { foo: 'bar' });
    expect(window.fetch.calledOnce).toBe(true);
    expect(window.fetch.args[0][0]).toBe('http://api.ethicaljobs.com.au/jobs');
    expect(window.fetch.args[0][1]).toMatchObject(expectedHeaders);
    expect(window.fetch.args[0][1]).toMatchObject({
      body: JSON.stringify({ foo: 'bar' }),
      method: 'delete',
    });
  });

});
