function ApiError(message, error) {
  Object.defineProperty(this, 'name', {
    enumerable: false,
    writable: false,
    value: 'ApiError'
  });

  Object.defineProperty(this, 'message', {
    enumerable: false,
    writable: true,
    value: message
  });

  Object.defineProperty(this, 'error', {
    enumerable: false,
    writable: true,
    value: error
  });

  if (Error.hasOwnProperty('captureStackTrace')) { // V8
    Error.captureStackTrace(this, ApiError);
  } else {
    Object.defineProperty(this, 'stack', {
      enumerable: false,
      writable: false,
      value: (new Error(message)).stack
    });
  }
}

if (typeof Object.setPrototypeOf === 'function') {
  Object.setPrototypeOf(ApiError.prototype, Error.prototype);
} else {
  ApiError.prototype = Object.create(Error.prototype, {
    constructor: { value: ApiError }
  });
}

export default ApiError;
