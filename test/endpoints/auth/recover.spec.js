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
  email: 'andrew@ethicaljobs.com.au',
};

describe('Password recovery endpoint', function () {

  const api = new Client();

  beforeEach (function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    return api.recover(credentials).then(response => {
      expect(api.post.calledOnce).to.be.true;
    });
  });

  it('should send correct parameters', function () {
    api.recover(credentials);
    expect(api.post.args[0][1]).to.deep.equal(credentials);
  });

  it('should have the correct endpoint', function () {
    api.recover(credentials);
    expect(api.post.args[0][0]).to.be.equal('/auth/recover');
  });

  it('should return the correct response', function () {
    return api.recover(credentials).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
