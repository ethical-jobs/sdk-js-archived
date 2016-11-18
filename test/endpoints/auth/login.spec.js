import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { login } from 'endpoints/auth';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

const credentials = {
  login: 'totoro',
  password: 'secret',
};

describe('Login endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    return login(credentials).then(response => {
      expect(client.post.calledOnce).to.be.true;
    });
  });

  it('should send correct parameters', function () {
    return login(credentials).then(response => {
      expect(client.post.args[0][1]).to.deep.equal(credentials);
    });
  });

  it('should have the correct endpoint', function () {
    return login(credentials).then(response => {
      expect(client.post.args[0][0]).to.be.equal('/auth/login');
    });
  });

  it('should return the correct response', function () {
    return login(credentials).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
