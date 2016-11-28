import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import axios from 'axios';
import getDomain from 'client/getDomain';

chai.expect();

const expect = chai.expect;

describe('getDomain function', function () {

  it('should be a function', function () {
    expect(getDomain).to.be.an('function');
  });

  it('should return production domain by default', function () {
    expect(getDomain()).to.be.equal('http://api.ethicaljobs.com.au');
  });

  it('should return valid production environment domain', function () {
    expect(getDomain('production')).to.be.equal('http://api.ethicaljobs.com.au');
  });

  it('should return valid test environment domain', function () {
    expect(getDomain('test')).to.be.equal('http://api.ethicalstaging.com.au');
  });

  it('should return valid development environment domain', function () {
    expect(getDomain('development')).to.be.equal('http://api.ethicaljobs.local');
  });

});
