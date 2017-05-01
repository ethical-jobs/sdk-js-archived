import 'isomorphic-fetch';

export function jsonOkResponseMock (body) {
  var mockResponse = new window.Response(JSON.stringify(body), {
    status: 200,
    ok: true,
    headers: {
      'Content-type': 'application/json'
    },
  });

  return Promise.resolve(mockResponse);
}

export function jsonErrorResponseMock (status, body) {
  var mockResponse = new window.Response(JSON.stringify(body), {
    status: status,
    ok: false,
    headers: {
      'Content-type': 'application/json'
    },
  });

  return Promise.reject(mockResponse);
}