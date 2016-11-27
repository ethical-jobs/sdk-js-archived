import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { detachJobMedia } from 'endpoints/jobs';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Detach media to job endpoint', function () {

  const params = {
    mediaId: 23,
    id: 123,
  };

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    detachJobMedia(params);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    detachJobMedia(params);
    expect(client.post.args[0][1]).to.deep.equal({ media_id: 23 });
  });

  it('should have the correct endpoint', function () {
    detachJobMedia(params);
    expect(client.post.args[0][0]).to.be.equal(`/job/123/detach`);
  });

  it('should return the correct response', function () {
    return detachJobMedia(params).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
