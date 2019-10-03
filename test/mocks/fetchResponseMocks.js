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

  // "fetch" doesn't reject the promise if it's able to get a response from the server, including for 400s and 500s
  // It relies on the "ok" flag to denote this instead
  // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
  return Promise.resolve(mockResponse);
}