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

describe('Load endpoint', function () {

  const api = new Client();

  beforeEach (function () {
    sinon.stub(api, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    api.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    return api.load().then(response => {
      expect(api.get.calledOnce).to.be.true;
    });
  });

  it('should send correct parameters', function () {
    api.load();
    api.load({ shouldNotAcceptArgs: 'foo' });
    expect(api.get.args[0][1]).to.be.equal(undefined);
    expect(api.get.args[1][1]).to.be.equal(undefined);
  });

  it('should have the correct endpoint', function () {
    api.load();
    expect(api.get.args[0][0]).to.be.equal('/auth/load');
  });

  it('should return the correct response', function () {
    return api.load().then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
