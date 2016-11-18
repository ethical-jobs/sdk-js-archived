import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import client from 'client';
import { purchaseCredits } from 'endpoints/invoices';

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

  beforeEach(function () {
    sinon.stub(client, 'post').resolves(willResolveWith);
  });

  afterEach(function () {
    client.post.restore();
  });

  it('should use the correct HTTP verb', function () {
    purchaseCredits(requestParams);
    expect(client.post.calledOnce).to.be.true;
  });

  it('should send correct params', function () {
    purchaseCredits(requestParams);
    expect(client.post.args[0][1]).to.deep.equal(requestParams);
  });

  it('should have the correct endpoint', function () {
    purchaseCredits(requestParams);
    expect(client.post.args[0][0]).to.be.equal(`/credits/purchase`);
  });

  it('should return the correct response', function () {
    return purchaseCredits(requestParams).then(response => {
      expect(response).to.be.equal(willResolveWith);
    });
  });
});
