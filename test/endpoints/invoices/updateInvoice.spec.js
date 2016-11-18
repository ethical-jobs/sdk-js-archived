import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { updateInvoice } from 'endpoints/invoices';

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

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    updateInvoice(invoice);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    updateInvoice(invoice);
    const { id, organisation_id, ...rest } = invoice;
    expect(client.post.args[0][1]).to.deep.equal(rest);
  });

  it('should have the correct endpoint', function () {
    updateInvoice(invoice);
    expect(client.post.args[0][0]).to.be.equal(`/organisation/${invoice.organisation_id}/invoice/${invoice.id}/update`);
  });

  it('should return the correct response', function () {
    return updateInvoice(invoice).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
