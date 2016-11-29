import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import Client from '../../../lib/ethical-jobs.js';

chai.expect();

const expect = chai.expect;

const willResolveWith = {
  foo: 'bar',
  bar: 'foo'
};

describe('Purchase credits endpoint', function () {

  const requestParams = {
    organisationId: 450,
    credit_pack_id: 12,
    method: 'credit_card',
    token: 'jakjncDjdndDkDDM',
    name: 'Roger Wilco',
    position: 'Janitor',
    organisation_name: 'Andromeda',
    email: 'roger.wilco@spacequest.org',
  };

  const api = new Client();

  beforeEach(function () {
    sinon.stub(api, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    api.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    api.purchaseCredits(requestParams);
    expect(api.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    api.purchaseCredits(requestParams);
    expect(api.post.args[0][1]).to.deep.equal(requestParams);
  });

  it('should have the correct endpoint', function () {
    api.purchaseCredits(requestParams);
    expect(api.post.args[0][0]).to.be.equal(`/credits/purchase`);
  });

  it('should return the correct response', function () {
    return api.purchaseCredits(requestParams).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
