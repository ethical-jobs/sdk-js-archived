import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import axios from 'axios';
import client from 'client';
import defaultQueryParams from 'client/defaultQueryParams';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo',
  bam: 'wham'
};

describe('Client HTTP verb functions', function () {

  beforeEach(function () {
    sinon.stub(axios, 'request').resolves(willResolveWith);
  });

  afterEach(function () {
    axios.request.restore();
  });

  it('should have all the HTTP verbs', function () {
    expect(client.get).to.be.an('function');
    expect(client.post).to.be.an('function');
    expect(client.patch).to.be.an('function');
    expect(client.put).to.be.an('function');
    expect(client.delete).to.be.an('function');
  });

  it('should have methods that return a promise', function () {
    return client.get().then(() => expect(true).to.be.true);
    return client.post().then(() => expect(true).to.be.true);
    return client.patch().then(() => expect(true).to.be.true);
    return client.put().then(() => expect(true).to.be.true);
    return client.delete().then(() => expect(true).to.be.true);
  });

});


describe('Client makeRequest function', function () {

  beforeEach(function () {
    sinon.stub(client, 'makeRequest');
    sinon.stub(axios, 'request').resolves(willResolveWith);
  });

  afterEach(function () {
    client.makeRequest.restore();
    axios.request.restore();
  });

  it('should call makeRequest only once', function () {
    client.get('/some/cool/endpoint', {});
    expect(client.makeRequest.calledOnce).to.be.true;
  });

  it('should call makeRequest with merged default parameters', function () {
    const params = {
      foo: 'bar',
      bar: 'foo',
    };
    client.get('/some/cool/endpoint', params);
    expect(client.makeRequest.args[0][0].data).to.deep.equal({
      ...defaultQueryParams,
      ...params,
    });
  });

  it('should overide any default parameters', function () {
    const params = {
      foo: 'bar',
      limit: 100,
      since: 14482723746,
    };
    client.get('/some/cool/endpoint', params);
    expect(client.makeRequest.args[0][0].data.limit).to.be.equal(params.limit);
    expect(client.makeRequest.args[0][0].data.since).to.be.equal(params.since);
  });

});


describe('Client generateRoute function', function () {

  beforeEach(function () {
    sinon.stub(client, 'generateRoute');
    sinon.stub(axios, 'request').resolves(willResolveWith);
  });

  afterEach(function () {
    client.generateRoute.restore();
    axios.request.restore();
  });

  it('should call generateRoute only once', function () {
    client.get('/some/cool/endpoint', {});
    expect(client.generateRoute.calledOnce).to.be.true;
  });

  it('should call generateRoute with a base route', function () {
    client.get('/some/cool/endpoint', {});
    expect(client.generateRoute.args[0][0]).to.be.equal('/some/cool/endpoint');
  });

  it('should call generateRoute with an organsiationId when included in params', function () {
    const params = {
      foo: 'bar',
      bar: 'foo',
      organisationId: 123456,
    };
    client.get('/some/cool/endpoint', params);
    expect(client.generateRoute.args[0][1]).to.be.equal(params.organisationId);
  });

});
