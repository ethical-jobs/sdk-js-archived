import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { exportUrl } from 'endpoints/export';

chai.expect();

const expect = chai.expect;

const exportParams = { type: 'invoices', since: 1479435888792, after: 1479435888500 };

describe('Load endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'link');
  });

  afterEach(function () {
    client.link.restore();
  });

  it('should call the link method on client', function () {
    exportUrl(exportParams);
    expect(client.link.calledOnce).to.be.true;
  });

  it('should send correct type parameter', function () {
    exportUrl(exportParams);
    expect(client.link.args[0][0]).to.be.equal(exportParams.type);
  });

  it('should send correct url parameters', function () {
    exportUrl(exportParams);
    const { type, ...rest } = exportParams;
    expect(client.link.args[0][1]).to.deep.equal(rest);
  });

});
