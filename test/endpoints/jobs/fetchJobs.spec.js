import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { fetchJobs } from 'endpoints/jobs';

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

  beforeEach(function () {
    sinon.stub(client, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    client.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    fetchJobs();
    expect(client.get.calledOnce).to.be.true;
  });

  it('should send organisationId as null by default', function () {
    fetchJobs();
    expect(client.get.args[0][1]).to.deep.equal({ organisationId: null });
  });

  it('should modify the route with a jobType parameter', function () {
    fetchJobs({ jobType: 'foo-bar-bam' });
    expect(client.get.args[0][0]).to.be.equal('/jobs/foo-bar-bam');
  });

  it('should send any additional parameters', function () {
    fetchJobs({ organisationId: 123, foo: 'bar', bar: 'foo' });
    expect(client.get.args[0][1]).to.deep.equal({ organisationId: 123, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct base endpoint', function () {
    fetchJobs({ id: 22 });
    expect(client.get.args[0][0]).to.be.equal('/jobs');
  });

  it('should return the correct response', function () {
    return fetchJobs().then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
