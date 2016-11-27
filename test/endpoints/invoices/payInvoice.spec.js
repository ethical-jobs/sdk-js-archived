import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { payInvoice } from 'endpoints/invoices';

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

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    payInvoice(requestParams);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    payInvoice({ ...requestParams, foo: 'bar', bar: 'foo' });
    expect(client.post.args[0][1]).to.deep.equal({ organisationId: 450, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct endpoint', function () {
    payInvoice(requestParams);
    expect(client.post.args[0][0]).to.be.equal(`/invoice/22/paid`);
  });

  it('should return the unpaid endpoint with correct param', function () {
    payInvoice({ ...requestParams, markAsUnPaid: true });
    expect(client.post.args[0][0]).to.be.equal(`/invoice/22/unpaid`);
  });

  it('should return the correct response', function () {
    return payInvoice(requestParams).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
