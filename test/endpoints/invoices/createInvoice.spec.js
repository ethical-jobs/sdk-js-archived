import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { createInvoice } from 'endpoints/invoices';

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

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    createInvoice(invoice);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    createInvoice(invoice);
    const { organisation_id, ...rest } = invoice;
    expect(client.post.args[0][1]).to.deep.equal(rest);
  });

  it('should have the correct endpoint', function () {
    createInvoice(invoice);
    expect(client.post.args[0][0]).to.be.equal(`/organisation/${invoice.organisation_id}/invoice/create`);
  });

  it('should return the correct response', function () {
    return createInvoice(invoice).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
