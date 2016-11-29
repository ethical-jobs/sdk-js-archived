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

describe('Fetch job endpoint', function () {

  const api = new Client();

  beforeEach (function () {
    sinon.stub(api, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    api.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.fetchJob({ id: 22 });
    expect(api.get.calledOnce).to.be.true;
  });

  it('should send organisationId as null by default', function () {
    api.fetchJob({ id: 22 });
    expect(api.get.args[0][1]).to.deep.equal({ organisationId: null });
  });

  it('should send any additional parameters', function () {
    api.fetchJob({ id: 22, foo: 'bar', bar: 'foo' });
    expect(api.get.args[0][1]).to.deep.equal({ organisationId: null, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct base endpoint', function () {
    api.fetchJob({ id: 22 });
    expect(api.get.args[0][0]).to.be.equal('/job/22');
  });

  it('should return the correct response', function () {
    return api.fetchJob({ id: 22 }).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
