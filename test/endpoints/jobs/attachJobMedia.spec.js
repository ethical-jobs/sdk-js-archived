import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { attachJobMedia } from 'endpoints/jobs';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Attach media to job endpoint', function () {

  const params = {
    formData: {
      foo: 'bar',
      bar: 'foo',
    },
    id: 123,
  };

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    attachJobMedia(params);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    attachJobMedia(params);
    expect(client.post.args[0][1]).to.deep.equal(params.formData);
  });

  it('should have the correct endpoint', function () {
    attachJobMedia(params);
    expect(client.post.args[0][0]).to.be.equal(`/job/${params.id}/attach`);
  });

  it('should return the correct response', function () {
    return attachJobMedia(params).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
