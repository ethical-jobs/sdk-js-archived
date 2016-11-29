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

const credentials = {
  username: 'harrypotter',
  password: 'expelliarmus',
  password_confirmation: 'expelliarmus',
  token: 'djFfS37s,jc937SAS87sbdmd',
};

describe('Password reset endpoint', function () {

  const api = new Client();

  beforeEach (function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    return api.reset(credentials).then(response => {
      expect(api.post.calledOnce).to.be.true;
    });
  });

  it('should send correct parameters', function () {
    api.reset(credentials);
    expect(api.post.args[0][1]).to.deep.equal(credentials);
  });

  it('should have the correct endpoint', function () {
    api.reset(credentials);
    expect(api.post.args[0][0]).to.be.equal('/auth/reset');
  });

  it('should return the correct response', function () {
    return api.reset(credentials).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
