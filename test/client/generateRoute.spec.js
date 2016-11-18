import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import axios from 'axios';
import generateRoute from 'client/generateRoute';

chai.expect();

const expect = chai.expect;

describe('generateRoute function', function () {

  it('should be a function', function () {
    expect(generateRoute).to.be.an('function');
  });

  it('should return valid route when only base route specified', function () {
    expect(generateRoute('/route/to/my/endpoint')).to.be.equal('/route/to/my/endpoint');
  });

  it('should return valid organisation route when organisationId is specified', function () {
    expect(generateRoute('/job/2847', 27463)).to.be.equal('/organisation/27463/job/2847');
  });

  it('should return empty string with no parameters', function () {
    expect(generateRoute()).to.be.equal('');
  });

});
