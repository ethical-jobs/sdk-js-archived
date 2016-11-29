import chai from 'chai';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

describe('getDomain function', function () {

  const api = new Client();

  it('should be a function', function () {
    expect(api.getDomain).to.be.an('function');
  });

  it('should return production domain by default', function () {
    expect(api.getDomain()).to.be.equal('http://api.ethicaljobs.com.au');
  });

  it('should return valid production environment domain', function () {
    expect(api.getDomain('production')).to.be.equal('http://api.ethicaljobs.com.au');
  });

  it('should return valid test environment domain', function () {
    expect(api.getDomain('test')).to.be.equal('http://api.ethicalstaging.com.au');
  });

  it('should return valid development environment domain', function () {
    expect(api.getDomain('development')).to.be.equal('http://api.ethicaljobs.local');
  });

});
