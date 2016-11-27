import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { updateJob } from 'endpoints/jobs';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Update job endpoint', function () {

  const job = {
    id: 1234,
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
    updateJob(job);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct default params', function () {
    updateJob(job);
    const { id, organisation_id, ...params } = job;
    expect(client.post.args[0][1]).to.deep.equal({ organisationId: organisation_id, drafting: false, ...params });
  });

  it('should send correct drafting param', function () {
    updateJob({ drafting: true, job });
    const { id, organisation_id, ...params } = job;
    expect(client.post.args[0][1].drafting).to.be.true;
  });

  it('should have the correct endpoint', function () {
    updateJob(job);
    expect(client.post.args[0][0]).to.be.equal(`/job/${job.id}/update`);
  });

  it('should return the correct response', function () {
    return updateJob(job).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
