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

describe('Attach media to job endpoint', function () {

  const params = {
    formData: {
      foo: 'bar',
      bar: 'foo',
    },
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
    api.attachJobMedia(params);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.attachJobMedia(params);
    expect(api.post.args[0][1]).to.deep.equal(params.formData);
  });

  it('should have the correct endpoint', function () {
    api.attachJobMedia(params);
    expect(api.post.args[0][0]).to.be.equal(`/job/${params.id}/attach`);
  });

  it('should return the correct response', function () {
    return api.attachJobMedia(params).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
