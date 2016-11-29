import chai from 'chai';
import Client from '../../lib/ethical-jobs';

chai.expect();

const expect = chai.expect;

describe('Can be consumed by end users', function () {

  it('should be able to initi the base client', function () {
    expect(new Client()).to.be.an('object');
  });

  it('should be able to make a call to app/initialize endpoint', function () {
    // This is a real HTTP end-to-end test
    // We will only perform one of these tests against our staging server
    // Otherwise it is slow, and more importantly testing the actual API is not at concern of an SDK
    const api = new Client();
    api.setEnvironment('test');
    return api.initialize().then(response => {
      expect(response.data).to.be.an('object');
      expect(response.data.enumerables).to.be.an('object');
    });
  });

});
