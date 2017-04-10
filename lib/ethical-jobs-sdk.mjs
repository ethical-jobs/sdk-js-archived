var index$3 = function index(str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index$5 = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [encode(key, opts), '[', index, ']'].join('') : [encode(key, opts), '[', encode(index, opts), ']=', encode(value, opts)].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [encode(key, opts), '[]=', encode(value, opts)].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [encode(key, opts), '=', encode(value, opts)].join('');
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? index$3(value) : encodeURIComponent(value);
	}

	return value;
}

var stringify = function stringify(obj, opts) {
	var defaults$$1 = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = index$5(defaults$$1, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

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

  if (Error.hasOwnProperty('captureStackTrace')) {
    // V8
    Error.captureStackTrace(this, ApiError);
  } else {
    Object.defineProperty(this, 'stack', {
      enumerable: false,
      writable: false,
      value: new Error(message).stack
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

var Client = function Client(environment) {
  var _this = this;

  this.environment = environment || 'production';

  ['post', 'get', 'put', 'patch', 'delete'].forEach(function (verb) {
    _this[verb] = function (route, params) {
      return _this.dispatchRequest(verb, route, params);
    };
  });

  ['auth', 'jobs'].forEach(function (helperNamespace) {
    _this[helperNamespace] = {};
  });

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getParams = function (verb, params) {
    return {
      method: verb,
      timeout: 3500,
      body: verb === 'get' ? null : JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getDomain = function () {
    var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    switch (environment.toLowerCase()) {
      default:
      case 'production':
        return 'http://api.ethicaljobs.com.au';
      case 'test':
        return 'http://api.ethicalstaging.com.au';
      case 'development':
        return 'http://api.ethicaljobs.local';
    }
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getRoute = function () {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var verb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var queryString = verb === 'get' ? stringify(params) : '';
    return route + (queryString.length ? '?' + queryString : '');
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseJson = function (response) {
    return response.json().then(function (json) {
      return {
        status: response.status,
        ok: response.ok,
        json: json
      };
    });
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseJson = function (response) {
    if (response.ok) {
      return response.json;
    } else {
      throw new ApiError(response.json.message, response.json);
    }
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.dispatchRequest = function (verb, route, params) {
    var reqUrl = _this.getDomain(_this.environment) + _this.getRoute(route, verb, params);
    var reqParams = _this.getParams(verb, params);
    return fetch(reqUrl, reqParams).then(_this.parseJson).then(_this.checkStatus);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.link = function (route, params) {
    var stringifiedParams = '';
    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && Object.keys(params).length) {
      stringifiedParams = '?' + stringify(params);
    }
    return '' + route + stringifiedParams;
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.initialize = function () {
    return _this.get('/', {});
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.exportUrl = function (resource, params) {
    return _this.link('/exports/csv/' + resource, params);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.search = function (resource, params) {
    return _this.get('/search/' + resource, params);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.login = function (params) {
    return _this.post('/users/token', params).then(function (response) {
      localStorage.setItem('_token', response && response.meta && response.meta.token);
      return response;
    });
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.logout = function () {
    localStorage.removeItem('_token');
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.load = function () {
    var token = localStorage.getItem('_token');
    return _this.get('/users/token/' + token);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.recoverPassword = function (email) {
    return _this.post('/users/token/recover', { email: email });
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.resetPassword = function (params) {
    return _this.post('/auth/reset', params);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.approve = function (id) {
    return _this.patch('/jobs/' + id, { status: 'APPROVED' });
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.expire = function (id) {
    return _this.patch('/jobs/' + id, { expires_at: new Date().getTime() });
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.attachMedia = function (id, formData) {
    return _this.post('/jobs/' + id + '/attachments', formData);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.jobs.detachMedia = function (id, attachmentId) {
    return _this.delete('/jobs/' + id + '/attachments/' + attachmentId, {});
  };
};

var index = {
  Client: Client,
  ApiError: ApiError
};

export default index;
//# sourceMappingURL=ethical-jobs-sdk.mjs.map
