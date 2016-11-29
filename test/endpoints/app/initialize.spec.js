import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo',
  bam: 'wham'
};

describe('Initialize endpoint', function () {

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    api.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    return api.initialize().then(response => {
      expect(api.get.calledOnce).to.be.true;
    });
  });

  it('should not send any parameters', function () {
    return api.initialize().then(response => {
      expect(api.get.args[0][1]).to.be.empty;
    });
  });

  it('should have the correct endpoint', function () {
    return api.initialize().then(response => {
      expect(api.get.args[0][0]).to.be.equal('/app/initialize');
    });
  });

  it('should return the correct response', function () {
    return api.initialize().then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
