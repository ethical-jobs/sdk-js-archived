import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { load } from 'endpoints/auth';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Load endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    client.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    return load().then(response => {
      expect(client.get.calledOnce).to.be.true;
    });
  });

  it('should send correct parameters', function () {
    load();
    load({ shouldNotAcceptArgs: 'foo' });
    expect(client.get.args[0][1]).to.be.equal(undefined);
    expect(client.get.args[1][1]).to.be.equal(undefined);
  });

  it('should have the correct endpoint', function () {
    load();
    expect(client.get.args[0][0]).to.be.equal('/auth/load');
  });

  it('should return the correct response', function () {
    return load().then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
