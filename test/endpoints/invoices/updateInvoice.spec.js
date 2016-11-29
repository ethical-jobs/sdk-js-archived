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

describe('Update invoice endpoint', function () {

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
    api.updateInvoice(invoice);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.updateInvoice(invoice);
    const { id, organisation_id, ...rest } = invoice;
    expect(api.post.args[0][1]).to.deep.equal({ organisationId: organisation_id, ...rest });
  });

  it('should have the correct endpoint', function () {
    api.updateInvoice(invoice);
    expect(api.post.args[0][0]).to.be.equal(`/invoice/${invoice.id}/update`);
  });

  it('should return the correct response', function () {
    return api.updateInvoice(invoice).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
