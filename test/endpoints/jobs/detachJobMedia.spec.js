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

describe('Detach media to job endpoint', function () {

  const params = {
    mediaId: 23,
    id: 123,
  };

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.detachJobMedia(params);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.detachJobMedia(params);
    expect(api.post.args[0][1]).to.deep.equal({ media_id: 23 });
  });

  it('should have the correct endpoint', function () {
    api.detachJobMedia(params);
    expect(api.post.args[0][0]).to.be.equal(`/job/123/detach`);
  });

  it('should return the correct response', function () {
    return api.detachJobMedia(params).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
