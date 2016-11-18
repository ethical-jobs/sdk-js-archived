import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';

chai.expect();

const expect = chai.expect;

describe('Client link function', function () {

  it('should be a function', function () {
    expect(client.link).to.be.an('function');
  });

  it('should return correct route when type is specified', function () {
    expect(client.link('jobs')).to.be.equal('/export/jobs');
  });

  it('should stringify any parameters', function () {
    const params = { name: 'andrew', age: 33, location: 'Bellingen' };
    expect(client.link('jobs', params)).to.be.equal('/export/jobs?age=33&location=Bellingen&name=andrew');
  });

  it('should not stringify an empty object parameter', function () {
    expect(client.link('jobs', {})).to.not.contain('?');
  });

  it('should return empty string with no parameters', function () {
    expect(client.link()).to.be.equal('');
  });

});
