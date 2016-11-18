import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { recover } from 'endpoints/auth';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

const credentials = {
  email: 'andrew@ethicaljobs.com.au',
};

describe('Password recovery endpoint', function () {

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    return recover(credentials).then(response => {
      expect(client.post.calledOnce).to.be.true;
    });
  });

  it('should send correct parameters', function () {
    recover(credentials);
    expect(client.post.args[0][1]).to.deep.equal(credentials);
  });

  it('should have the correct endpoint', function () {
    recover(credentials);
    expect(client.post.args[0][0]).to.be.equal('/auth/recover');
  });

  it('should return the correct response', function () {
    return recover(credentials).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
