import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import axios from 'axios';
import Client from '../../lib/ethical-jobs.js';
import defaultQueryParams from '../../src/client/defaultQueryParams';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo',
  bam: 'wham'
};

describe('Client HTTP verb functions', function () {

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'dispatchRequest').returns(willResolveWith);
  });

  afterEach(function () {
    api.dispatchRequest.restore();
  });

  it('should have all the HTTP verbs', function () {
    expect(api.get).to.be.an('function');
    expect(api.post).to.be.an('function');
    expect(api.patch).to.be.an('function');
    expect(api.put).to.be.an('function');
    expect(api.delete).to.be.an('function');
  });

  it('should have HTTP methods that return the value from dispatchRequest', function () {
    expect(api.get()).to.deep.equal(willResolveWith);
    expect(api.post()).to.deep.equal(willResolveWith);
    expect(api.patch()).to.deep.equal(willResolveWith);
    expect(api.put()).to.deep.equal(willResolveWith);
    expect(api.delete()).to.deep.equal(willResolveWith);
  });

  it('should call getDomain with correct environment', function () {
    sinon.stub(api, 'getDomain');
    api.get();
    expect(api.getDomain.args[0][0]).to.be.equal('production');
    api.getDomain.restore();
  });

  it('should call generateRoute with correct parameters', function () {
    sinon.stub(api, 'generateRoute');
    api.get('/my/route', { organisationId: 123 });
    expect(api.generateRoute.args[0][0]).to.be.equal('/my/route');
    expect(api.generateRoute.args[0][1]).to.be.equal(123);
    api.generateRoute.restore();
  });

  it('should call formatRequestParameters with correct parameters', function () {
    sinon.stub(api, 'formatRequestParameters');
    api.get('/my/route', { organisationId: 123, foo: 'bar' });
    expect(api.formatRequestParameters.args[0][0]).to.be.equal('get');
    expect(api.formatRequestParameters.args[0][2]).to.deep.equal({ organisationId: 123, foo: 'bar' });
    api.formatRequestParameters.restore();
  });

  it('should call dispatchRequest only once', function () {
    api.get();
    expect(api.dispatchRequest.calledOnce).to.be.true;
  });

});


describe('Client setEnvironment function', function () {

  const api = new Client();

  it('should have an initial environment of production', function () {
    expect(api.environment).to.be.equal('production');
  });

  it('should be able to set the environment', function () {
    const environment = api.setEnvironment('test');
    expect(api.environment).to.be.equal('test');
    expect(environment).to.be.equal('test');
  });

  it('should throw error on invalid environment', function () {
    expect(api.setEnvironment).to.throw(Error);
  });

});