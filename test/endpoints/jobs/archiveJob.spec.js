import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { archiveJob } from 'endpoints/jobs';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Archive job endpoint', function () {

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
    archiveJob(job);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct default params', function () {
    archiveJob(job);
    const { id, organisation_id, ...params } = job;
    expect(client.post.args[0][1]).to.deep.equal({ organisationId: organisation_id, ...params });
  });

  it('should have the correct default endpoint', function () {
    archiveJob(job);
    expect(client.post.args[0][0]).to.be.equal(`/job/${job.id}/delete`);
  });

  it('should use restore endpoint when restore is true', function () {
    archiveJob({ restore: true, ...job });
    expect(client.post.args[0][0]).to.be.equal(`/job/${job.id}/restore`);
  });

  it('should return the correct response', function () {
    return archiveJob(job).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
