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

describe('Create invoice endpoint', function () {

  const invoice = {
    organisation_id: 123456,
    uid: '2016_10_15_001',
    service_name: 'Job ad credits',
  };

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.createInvoice(invoice);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.createInvoice(invoice);
    const { organisation_id, ...params } = invoice;
    expect(api.post.args[0][1]).to.deep.equal({ organisationId: invoice.organisation_id, ...params });
  });

  it('should have the correct endpoint', function () {
    api.createInvoice(invoice);
    expect(api.post.args[0][0]).to.be.equal(`/invoice/create`);
  });

  it('should return the correct response', function () {
    return api.createInvoice(invoice).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
