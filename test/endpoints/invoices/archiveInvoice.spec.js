import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { archiveInvoice } from 'endpoints/invoices';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Archive invoice endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    archiveInvoice({ organisation_id: 123, id: 33 });
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    archiveInvoice({ organisation_id: 123, id: 33, foo: 'bar', bar: 'foo' });
    expect(client.post.args[0][1]).to.deep.equal({ organisationId: 123, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct default endpoint', function () {
    archiveInvoice({ organisation_id: 123, id: 33 });
    expect(client.post.args[0][0]).to.be.equal(`/invoice/33/delete`);
  });

  it('should return the restore endpoint when restore param is true', function () {
    archiveInvoice({ organisation_id: 123, id: 33, restore: true });
    expect(client.post.args[0][0]).to.be.equal(`/invoice/33/restore`);
  });

  it('should return the correct response', function () {
    return archiveInvoice({ organisation_id: 123, id: 33 }).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
