import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { fetchInvoice } from 'endpoints/invoices';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Fetch invoice endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    client.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    fetchInvoice({ id: 22 });
    expect(client.get.calledOnce).to.be.true;
  });

  it('should send organisationId as null by default', function () {
    fetchInvoice({ id: 22 });
    expect(client.get.args[0][1]).to.deep.equal({ organisationId: null });
  });

  it('should send any additional parameters', function () {
    fetchInvoice({ id: 22, foo: 'bar', bar: 'foo' });
    expect(client.get.args[0][1]).to.deep.equal({ organisationId: null, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct base endpoint', function () {
    fetchInvoice({ id: 22 });
    expect(client.get.args[0][0]).to.be.equal('/invoice/22');
  });

  it('should return the correct response', function () {
    return fetchInvoice({ id: 22 }).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
