import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { initialize } from 'endpoints';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo',
  bam: 'wham'
};

describe('Initialize endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'get').resolves(willResolveWith);
  });

  afterEach(function () {
    client.get.restore();
  });

  it('should use the correct HTTP verb', function () {
    return initialize().then(response => {
      expect(client.get.calledOnce).to.be.true;
    });
  });

  it('should not send any parameters', function () {
    return initialize().then(response => {
      expect(client.get.args[0][1]).to.be.empty;
    });
  });

  it('should have the correct endpoint', function () {
    return initialize().then(response => {
      expect(client.get.args[0][0]).to.be.equal('/app/initialize');
    });
  });

  it('should return the correct response', function () {
    return initialize().then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
