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

describe('Archive job endpoint', function () {

  const job = {
    id: 1234,
    organisation_id: 123456,
    uid: 'ScFkKmcoijasz$%dmn',
    title: 'React Web Developer',
  };

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.archiveJob(job);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct default params', function () {
    api.archiveJob(job);
    const { id, organisation_id, ...params } = job;
    expect(api.post.args[0][1]).to.deep.equal({ organisationId: organisation_id, ...params });
  });

  it('should have the correct default endpoint', function () {
    api.archiveJob(job);
    expect(api.post.args[0][0]).to.be.equal(`/job/${job.id}/delete`);
  });

  it('should use restore endpoint when restore is true', function () {
    api.archiveJob({ restore: true, ...job });
    expect(api.post.args[0][0]).to.be.equal(`/job/${job.id}/restore`);
  });

  it('should return the correct response', function () {
    return api.archiveJob(job).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
