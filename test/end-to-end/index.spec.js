import Client from '../../lib/ethical-jobs';

describe('Can be consumed by end users', function () {

  test('should be able to initi the base client', function () {
    expect(new Client()).toBeInstanceOf(Client);
  });

  /*
  |--------------------------------------------------------------------------
  | End-to-end HTTP tests
  |--------------------------------------------------------------------------
  |
  | This is a real HTTP end-to-end test
  | We will only perform a few of these tests against our staging server
  | Otherwise it is slow, and more importantly testing the actual API is not at concern of an SDK
  |
  */

  // test('should be able to make a call to app/initialize endpoint', function () {
  //   const api = new Client();
  //   api.setEnvironment('production');
  //   return api.initialize().then(response => {
  //     expect(response.data).to.be.an('object');
  //     expect(response.data.enumerables).to.be.an('object');
  //   });
  // });

  // test('should not authorize without tokens', function () {
  //   const api = new Client();
  //   api.setEnvironment('production');
  //   return api.post({ organisation_id: 1 }).catch(error => {
  //     expect(error.statusCode).toBe(401);
  //   });
  // });

});
