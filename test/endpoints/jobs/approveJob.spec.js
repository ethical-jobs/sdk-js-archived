import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { approveJob } from 'endpoints/jobs';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Approve job endpoint', function () {

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
    approveJob(job);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct default params', function () {
    approveJob(job);
    const { id, organisation_id, ...params } = job;
    expect(client.post.args[0][1]).to.deep.equal({ organisationId: organisation_id, ...params });
  });

  it('should have the correct endpoint', function () {
    approveJob(job);
    expect(client.post.args[0][0]).to.be.equal(`/job/${job.id}/approve`);
  });

  it('should return the correct response', function () {
    return approveJob(job).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
