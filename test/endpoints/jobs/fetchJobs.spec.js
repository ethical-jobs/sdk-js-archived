import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Fetch jobs endpoint', function () {

  const requestParams = {
    organisationId: 450,
  };

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    api.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.fetchJobs();
    expect(api.get.calledOnce).to.be.true;
  });

  it('should send organisationId as null by default', function () {
    api.fetchJobs();
    expect(api.get.args[0][1]).to.deep.equal({ organisationId: null });
  });

  it('should modify the route with a jobType parameter', function () {
    api.fetchJobs({ jobType: 'foo-bar-bam' });
    expect(api.get.args[0][0]).to.be.equal('/jobs/foo-bar-bam');
  });

  it('should send any additional parameters', function () {
    api.fetchJobs({ organisationId: 123, foo: 'bar', bar: 'foo' });
    expect(api.get.args[0][1]).to.deep.equal({ organisationId: 123, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct base endpoint', function () {
    api.fetchJobs({ id: 22 });
    expect(api.get.args[0][0]).to.be.equal('/jobs');
  });

  it('should return the correct response', function () {
    return api.fetchJobs().then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
