import chai from 'chai';
import 'sinon-as-promised';
import Client from '../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

describe('Client link function', function () {

  const api = new Client();

  it('should be a function', function () {
    expect(api.link).to.be.an('function');
  });

  it('should return correct route when type is specified', function () {
    expect(api.link('jobs')).to.be.equal('/export/jobs');
  });

  it('should stringify any parameters', function () {
    const params = { name: 'andrew', age: 33, location: 'Bellingen' };
    expect(api.link('jobs', params)).to.be.equal('/export/jobs?age=33&location=Bellingen&name=andrew');
  });

  it('should not stringify an empty object parameter', function () {
    expect(api.link('jobs', {})).to.not.contain('?');
  });

  it('should return empty string with no parameters', function () {
    expect(api.link()).to.be.equal('');
  });

});
