import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

const exportParams = { type: 'invoices', since: 1479435888792, after: 1479435888500 };

describe('Load endpoint', function () {

  const api = new Client();

  beforeEach (function () {
    sinon.stub(api, 'link');
  });

  afterEach(function () {
    api.link.restore();
  });

  it('should call the link method on api', function () {
    api.exportUrl(exportParams);
    expect(api.link.calledOnce).to.be.true;
  });

  it('should send correct type parameter', function () {
    api.exportUrl(exportParams);
    expect(api.link.args[0][0]).to.be.equal(exportParams.type);
  });

  it('should send correct url parameters', function () {
    api.exportUrl(exportParams);
    const { type, ...rest } = exportParams;
    expect(api.link.args[0][1]).to.deep.equal(rest);
  });

});
