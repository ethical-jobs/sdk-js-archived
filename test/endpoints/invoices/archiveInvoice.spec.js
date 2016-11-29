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

describe('Archive invoice endpoint', function () {

  const api = new Client();

  beforeEach (function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.archiveInvoice({ organisation_id: 123, id: 33 });
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.archiveInvoice({ organisation_id: 123, id: 33, foo: 'bar', bar: 'foo' });
    expect(api.post.args[0][1]).to.deep.equal({ organisationId: 123, foo: 'bar', bar: 'foo' });
  });

  it('should have the correct default endpoint', function () {
    api.archiveInvoice({ organisation_id: 123, id: 33 });
    expect(api.post.args[0][0]).to.be.equal(`/invoice/33/delete`);
  });

  it('should return the restore endpoint when restore param is true', function () {
    api.archiveInvoice({ organisation_id: 123, id: 33, restore: true });
    expect(api.post.args[0][0]).to.be.equal(`/invoice/33/restore`);
  });

  it('should return the correct response', function () {
    return api.archiveInvoice({ organisation_id: 123, id: 33 }).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
