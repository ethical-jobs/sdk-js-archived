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

describe('Pay invoice endpoint', function () {

  const requestParams = {
    organisation_id: 450,
    id: 22,
  };

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.payInvoice(requestParams);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.payInvoice({ ...requestParams, foo: 'bar', bar: 'foo' });
    expect(api.post.args[0][1]).to.deep.equal({ organisationId: 450, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct endpoint', function () {
    api.payInvoice(requestParams);
    expect(api.post.args[0][0]).to.be.equal(`/invoice/22/paid`);
  });

  it('should return the unpaid endpoint with correct param', function () {
    api.payInvoice({ ...requestParams, markAsUnPaid: true });
    expect(api.post.args[0][0]).to.be.equal(`/invoice/22/unpaid`);
  });

  it('should return the correct response', function () {
    return api.payInvoice(requestParams).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
