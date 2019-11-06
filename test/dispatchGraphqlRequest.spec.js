import 'isomorphic-fetch';
import { jsonOkResponseMock, jsonErrorResponseMock } from './mocks/fetchResponseMocks';
import sinon from 'sinon';
import Api from '..';

describe('dispatchGraphqlRequest function', () => {
  const body = '{"operationName":"GetOrgWithJobs","variables":{"id":"1"},"query":"query GetOrgWithJobs($id: ID!) {\\n  organisation(id: $id) {\\n    id\\n    external_id\\n    name\\n    jobs {\\n      id\\n      external_id\\n      title\\n      applications {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}';

  beforeEach(() => {
    sinon.stub(window, 'fetch').returns(
      jsonOkResponseMock({ foo: 'bar' })
    );
  });

  const expectedHeaders = {
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 15000
  };

  test('should call fetch correctly', () => {
    Api.dispatchGraphqlRequest(body);
    expect(window.fetch.calledOnce).toBe(true);
    expect(window.fetch.args[0][0]).toBe('https://api.ethicaljobs.com.au/graphql');
    expect(window.fetch.args[0][1]).toMatchObject(expectedHeaders);
    expect(window.fetch.args[0][1]).toMatchObject({ body, method: 'POST' });
  });

  test('should expose text method that returns JSON string', async () => {
    const response = await Api.dispatchGraphqlRequest(body);
    const text = await response.text();
    expect(text).toBe('{"foo":"bar"}');
  });

  test('should call fetch with headers', () => {
    Api.get('/jobs', {}, { barBat: 'black-sheep' });
    const headers = {
      "Accept": "application/json",
      "Authorization": "",
      "Content-Type": "application/json",
      "barBat": "black-sheep",
    };
    expect(window.fetch.args[0][1].headers).toMatchObject(headers);
  });

  afterEach(() => {
    window.fetch.restore();
  });
});
