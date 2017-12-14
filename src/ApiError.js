import ExtendableError from 'es6-error';

class ApiError extends ExtendableError {
  constructor(message, errors, statusCode, debug = {}) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
    this.debug = debug;
  }
}

export default ApiError;
