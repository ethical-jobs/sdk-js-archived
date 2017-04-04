(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("EthicalJobs", [], factory);
	else if(typeof exports === 'object')
		exports["EthicalJobs"] = factory();
	else
		root["EthicalJobs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _client = __webpack_require__(1);

var _client2 = _interopRequireDefault(_client);

var _helpers = __webpack_require__(3);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|--------------------------------------------------------------------------
| Assign helper functions to the prototype of the client object
|--------------------------------------------------------------------------
*/

Object.keys(_helpers2.default).forEach(function (key) {
    _client2.default.prototype[key] = _helpers2.default[key];
});

exports.default = _client2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _isomorphicUnfetch = __webpack_require__(6);

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _queryString = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ...
 *
 * @author Andrew McLagan <andrewmclagan@gmail.com>
 */

var Client =

/**
 * ...
 *
 * @return Promise
 */
function Client() {
  var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'production';

  _classCallCheck(this, Client);

  this.httpVerbs = ['post', 'get', 'put', 'patch', 'delete'];

  this.environment = environment;
  this.generateHttpVerbFunctions();
};

;

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.generateHttpVerbFunctions = function () {
  var _this = this;

  this.httpVerbs.forEach(function (verb) {
    _this[verb] = function (route, params) {
      var reqUrl = _this.formatRoute(route, verb, params);
      var reqParams = _this.formatParameters(verb, params);
      return _this.dispatchRequest(reqUrl, reqParams);
    };
  });
};

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.dispatchRequest = function (url, params) {
  return (0, _isomorphicUnfetch2.default)(url, params).then(function (response) {
    return response.json();
  }).catch(function (error) {
    return error;
  });
};

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.formatParameters = function (verb, params) {
  return {
    method: verb,
    timeout: 3500,
    body: verb === 'get' ? JSON.stringify({}) : JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.formatRoute = function () {
  var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var verb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var queryString = verb === 'get' ? (0, _queryString.stringify)(params) : '';
  return this.getDomain(this.environment) + route + (queryString.length ? '?' + queryString : '');
};

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.getDomain = function () {
  var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  switch (environment.toLowerCase()) {
    default:
    case 'production':
      return '//api.ethicaljobs.com.au';
    case 'test':
      return '//api.ethicalstaging.com.au';
    case 'development':
      return '//api.ethicaljobs.local';
  }
};

/**
 * ...
 *
 * @return Promise
 */

Client.prototype.link = function (route, params) {
  var stringifiedParams = '';
  if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && Object.keys(params).length) {
    stringifiedParams = '?' + (0, _queryString.stringify)(params);
  }
  return '' + route + stringifiedParams;
};

/*
|--------------------------------------------------------------------------
| Export Client as default
|--------------------------------------------------------------------------
*/

exports.default = Client;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Sign in a user
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function login(params) {
  return this.post('/users/token', params).then(function (response) {
    localStorage.setItem('_token', response && response.meta && response.meta.token);
    return response;
  });
}

/**
 * Sign out a user
 *
 * @public
 * @return {Promise}
 */

function logout() {
  localStorage.removeItem('_token');
}

/**
 * Loads a user entity from JWT token
 *
 * @public
 * @return {Promise}
 */

function load() {
  var token = localStorage.getItem('_token');
  return this.get('/users/token/' + token);
}

/**
 * Dispatches a password recovery request
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function recoverPassword(email) {
  return this.post('/users/token/recover', { email: email });
}

/**
 * Resets a users password, from a reset token
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function resetPassword(params) {
  return this.post('/auth/reset', params);
}

// export with namesapce
exports.default = {
  login: login,
  logout: logout,
  load: load,
  recoverPassword: recoverPassword,
  resetPassword: resetPassword
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = __webpack_require__(2);

var _auth2 = _interopRequireDefault(_auth);

var _jobs = __webpack_require__(4);

var _jobs2 = _interopRequireDefault(_jobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetches initial application data: taxonomies, enumerables and credit packs
 *
 * @public
 * @return {Promise}
 */

function initialize() {
  return this.get('/', {});
}

/**
 * Returns an export to CSV url
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {String}
 */

function exportUrl(resource, params) {
  return this.link('/exports/csv/' + resource, params);
}

exports.default = _extends({}, _auth2.default, _jobs2.default, {
  initialize: initialize,
  exportUrl: exportUrl
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Approves a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function approve(id) {
  return this.patch('/jobs/' + id, { status: 'APPROVED' });
}

/**
 * Expires a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function expire(id) {
  return this.patch('/jobs/' + id, { expires_at: new Date().getTime() });
}

/**
 * Attaches media to a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function attachMedia(id, formData) {
  return this.post('/jobs/' + id + '/attachments', formData);
}

/**
 * Removes a media attachment from a job entity
 *
 * @public
 * @param {Object} [params] request parameters
 * @return {Promise}
 */

function detachMedia(id, attachmentId) {
  return this.delete('/jobs/' + id + '/attachments/' + attachmentId, {});
}

// export with namesapce
exports.default = {
  approve: approve,
  expire: expire,
  attachMedia: attachMedia,
  detachMedia: detachMedia
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = window.fetch = __webpack_require__(10);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
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
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(9);
var objectAssign = __webpack_require__(7);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);

				key = key.replace(/\[\]$/, '');

				if (!result || accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var index = typeof fetch=='function' ? fetch : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/200|0) == 1,		// 200-399
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function () { return Promise.resolve(request.responseText); },
				json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
				xml: function () { return Promise.resolve(request.responseXML); },
				blob: function () { return Promise.resolve(new Blob([request.response])); },
				headers: {
					keys: function () { return keys; },
					entries: function () { return all; },
					get: function (n) { return headers[n.toLowerCase()]; },
					has: function (n) { return n.toLowerCase() in headers; }
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=unfetch.es.js.map


/***/ })
/******/ ]);
});
//# sourceMappingURL=ethical-jobs.js.map