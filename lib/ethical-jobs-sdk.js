(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['ethical-jobs-sdk'] = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var index$1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
      cls.apply(this, arguments);
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
      constructor: {
        value: cls,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
      ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
  }

  var ExtendableError = function (_extendableBuiltin2) {
    _inherits(ExtendableError, _extendableBuiltin2);

    function ExtendableError() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, ExtendableError);

      // extending Error is weird and does not propagate `message`
      var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

      Object.defineProperty(_this, 'message', {
        configurable: true,
        enumerable: false,
        value: message,
        writable: true
      });

      Object.defineProperty(_this, 'name', {
        configurable: true,
        enumerable: false,
        value: _this.constructor.name,
        writable: true
      });

      if (Error.hasOwnProperty('captureStackTrace')) {
        Error.captureStackTrace(_this, _this.constructor);
        return _possibleConstructorReturn(_this);
      }

      Object.defineProperty(_this, 'stack', {
        configurable: true,
        enumerable: false,
        value: new Error(message).stack,
        writable: true
      });
      return _this;
    }

    return ExtendableError;
  }(_extendableBuiltin(Error));

  exports.default = ExtendableError;
  module.exports = exports['default'];
});

var ExtendableError = unwrapExports(index$1);

var ApiError = function (_ExtendableError) {
  inherits(ApiError, _ExtendableError);

  function ApiError(message, errors, statusCode) {
    var debug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    classCallCheck(this, ApiError);

    var _this = possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this, message));

    _this.errors = errors;
    _this.statusCode = statusCode;
    _this.debug = debug;
    return _this;
  }

  return ApiError;
}(ExtendableError);

/**
 * Checks if structure is 'like' an ImmutableJS object
 * @param  {mixed}  maybeImmutable
 */
function isImmutable(maybeImmutable) {
  if (maybeImmutable) {
    return typeof maybeImmutable.toJS === 'function';
  }
  return false;
}

/**
 * Jsonifies immutable structures
 * @param  {mixed} maybeImmutable
 */
function fromImmutable(maybeImmutable) {
  return isImmutable(maybeImmutable) ? maybeImmutable.toJS() : maybeImmutable;
}

var index$4 = function index(str) {
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

var index$6 = shouldUseNative() ? Object.assign : function (target, source) {
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
		return opts.strict ? index$4(value) : encodeURIComponent(value);
	}

	return value;
}

var stringify$1 = function stringify(obj, opts) {
	var defaults$$1 = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = index$6(defaults$$1, opts);

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

function stringify$$1(params) {
  Object.keys(params).map(function (key) {
    if (params[key] === false) {
      params[key] = 0;
    } else if (params[key] === true) {
      params[key] = 1;
    }
  });
  return stringify$1(params, { arrayFormat: 'bracket' });
}

/**
 * Detects if DOM is present
 * @return {bool}
 */
function canUseDom() {
  return typeof window !== 'undefined';
}

if (!canUseDom()) {
  global.FormData = require('form-data');
}

if (!canUseDom()) {
  var valuesMap = new Map();

  var LocalStorage = function () {
    function LocalStorage() {
      classCallCheck(this, LocalStorage);
    }

    createClass(LocalStorage, [{
      key: "getItem",
      value: function getItem(key) {
        var stringKey = String(key);
        if (valuesMap.has(key)) {
          return String(valuesMap.get(stringKey));
        }
        return null;
      }
    }, {
      key: "setItem",
      value: function setItem(key, val) {
        valuesMap.set(String(key), String(val));
      }
    }, {
      key: "removeItem",
      value: function removeItem(key) {
        valuesMap.delete(key);
      }
    }, {
      key: "clear",
      value: function clear() {
        valuesMap.clear();
      }
    }, {
      key: "key",
      value: function key(i) {
        if (arguments.length === 0) {
          throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."); // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
        }
        var arr = Array.from(valuesMap.keys());
        return arr[i];
      }
    }, {
      key: "length",
      get: function get$$1() {
        return valuesMap.size;
      }
    }]);
    return LocalStorage;
  }();

  var instance = new LocalStorage();

  global.localStorage = new Proxy(instance, {
    set: function set$$1(obj, prop, value) {
      if (LocalStorage.prototype.hasOwnProperty(prop)) {
        instance[prop] = value;
      } else {
        instance.setItem(prop, value);
      }
      return true;
    },
    get: function get$$1(target, name) {
      if (LocalStorage.prototype.hasOwnProperty(name)) {
        return instance[name];
      }
      if (valuesMap.has(name)) {
        return instance.getItem(name);
      }
    }
  });
}

var index = new function () {
  var _this = this;

  ['auth', 'jobs', 'media'].forEach(function (helperNamespace) {
    _this[helperNamespace] = {};
  });

  /**
   * Determines current env
   * @return String
   */
  this.getEnvironment = function () {
    var env = void 0;
    if (canUseDom()) {
      env = window.EJ_ENV;
    } else {
      env = process.env.EJ_ENV || process.env.REACT_APP_EJ_ENV;
    }
    return env || 'production';
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseParams = function (params) {
    if (params instanceof FormData) {
      return params;
    }
    return JSON.stringify(fromImmutable(params));
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getHeaders = function (params) {
    if (params instanceof FormData) {
      return undefined;
    }
    var auth = localStorage.getItem('_token') ? 'Bearer ' + localStorage.getItem('_token') : '';
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': auth
    };
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getParams = function () {
    var verb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
    var params = arguments[1];

    var parsed = {
      method: verb.toUpperCase(),
      timeout: 3500,
      body: verb.toUpperCase() === 'GET' ? null : _this.parseParams(params),
      headers: _this.getHeaders(params)
    };
    // Isomorphic SSL support
    // TODO: verify actual certs
    if (!canUseDom()) {
      var https = require("https");
      parsed.agent = new https.Agent({
        rejectUnauthorized: false
      });
    }
    return parsed;
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
        return 'https://api.ethicaljobs.com.au';
      case 'staging':
        return 'https://api.ethicalstaging.com.au';
      case 'development':
        return 'https://api.ethicaljobs.local';
    }
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.getRoute = function () {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var verb = arguments[1];
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (verb.toUpperCase() === 'GET') {
      var parsedParams = fromImmutable(params);
      var queryString = stringify$$1(parsedParams);
      return route + (queryString.length ? '?' + queryString : '');
    } else {
      return route;
    }
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.parseJson = function (response) {
    return response.text().then(function (text) {
      var json = text ? JSON.parse(text) : {};
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
  this.checkStatus = function (response) {
    if (response.ok) {
      return response.json;
    } else {
      throw new ApiError(response.json.message, response.json.errors, response.json.statusCode, response.json.debug);
    }
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.checkForToken = function (response) {
    if (response && response.meta && response.meta.token) {
      localStorage.setItem('_token', response.meta.token);
    }
    return response;
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.dispatchRequest = function (verb, route, params) {
    var reqUrl = _this.getDomain(_this.environment) + _this.getRoute(route, verb, params);
    var reqParams = _this.getParams(verb, params);
    return fetch(reqUrl, reqParams).then(_this.parseJson).then(_this.checkStatus).then(_this.checkForToken);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.link = function (route, params) {
    var stringifiedParams = '';
    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && Object.keys(params).length) {
      stringifiedParams = '?' + stringify$$1(params);
    }
    return '' + _this.getDomain(_this.environment) + route + stringifiedParams;
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
  this.archive = function (resource, id) {
    return _this.delete('/' + resource + '/' + id);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.restore = function (resource, id) {
    return _this.patch('/' + resource + '/' + id, { deleted_at: null });
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.login = function (params) {
    return _this.post('/users/token', params);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.auth.logout = function () {
    return new Promise(function (resolve) {
      localStorage.removeItem('_token');
      resolve(true);
    });
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
    return _this.post('/users/token/reset', params);
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
  this.media.upload = function (file) {
    var formData = new FormData();
    formData.append('media', file);
    return _this.post('/media', formData);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.attach = function (file, resource, resourceId) {
    var formData = new FormData();
    formData.append('media', file);
    return _this.post('/media/' + resource + '/' + resourceId, formData);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.detach = function (id, resource) {
    return _this.delete('/media/' + id + '/' + resource);
  };

  /**
   * Javascript style DocBlock
   * @return XXX
   */
  this.media.delete = function (id) {
    return _this.delete('/media/' + id);
  };

  this.environment = this.getEnvironment();

  ['post', 'get', 'put', 'patch', 'delete'].forEach(function (verb) {
    _this[verb] = function (route, params) {
      return _this.dispatchRequest(verb, route, params);
    };
  });
}();

return index;

})));
//# sourceMappingURL=ethical-jobs-sdk.js.map
