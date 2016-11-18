import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import axios from 'axios';
import makeRequest from 'client/makeRequest';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  headers: { 'X-Custom-Header': 'foobar' },
  status: 200,
  config: {},
  data: {
    foo: 'bar',
    bar: 'foo',
    bam: 'wham'
  },
};

const willRejectWith = {
  headers: { 'X-Custom-Header': 'foobar' },
  status: 500,
  config: {},
  response: {
    data: {
      errors: [],
      message: 'Uh-oh...'
    },
  }
};

describe('makeRequest function', function () {

  beforeEach(function () {
    sinon.stub(axios, 'request').resolves(willResolveWith);
  });

  afterEach(function () {
    axios.request.restore();
  });

  it('should make request only once', function () {
    makeRequest();
    expect(axios.request.calledOnce).to.be.true;
  });

  it('should make request with correct params', function () {
    const params = { author: 'hayao miyazaki', film: 'Princess Mononoke' };
    makeRequest(params);
    expect(axios.request.calledWith(params)).to.be.true;
  });

  it('should return only data portion of response', function () {
    return makeRequest().then(response => {
      expect(response).to.be.equal(willResolveWith.data);
    });
  });

  it('should return only data portion of error response', function () {
    axios.request.restore();
    sinon.stub(axios, 'request').rejects(willRejectWith);
    return makeRequest().catch(error => {
      expect(error).to.be.equal(willRejectWith.response.data);
    });
  });

});
