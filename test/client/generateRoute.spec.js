import chai from 'chai';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

describe('generateRoute function', function () {

  const api = new Client();

  it('should be a function', function () {
    expect(api.generateRoute).to.be.an('function');
  });

  it('should return valid route when only base route specified', function () {
    expect(api.generateRoute('/route/to/my/endpoint')).to.be.equal('/route/to/my/endpoint');
  });

  it('should return valid organisation route when organisationId is specified', function () {
    expect(api.generateRoute('/job/2847', 27463)).to.be.equal('/organisation/27463/job/2847');
  });

  it('should return empty string with no parameters', function () {
    expect(api.generateRoute()).to.be.equal('');
  });

});
