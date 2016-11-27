import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { createJob } from 'endpoints/jobs';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Create job endpoint', function () {

  const job = {
    organisation_id: 123456,
    uid: 'ScFkKmcoijasz$%dmn',
    title: 'React Web Developer',
  };

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    createJob(job);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    createJob(job);
    const { organisation_id, ...params } = job;
    expect(client.post.args[0][1]).to.deep.equal({ organisationId: organisation_id, ...params });
  });

  it('should have the correct endpoint', function () {
    createJob(job);
    expect(client.post.args[0][0]).to.be.equal(`/job/create`);
  });

  it('should return the correct response', function () {
    return createJob(job).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
