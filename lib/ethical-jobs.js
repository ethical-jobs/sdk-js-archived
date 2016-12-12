(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"));
	else if(typeof define === 'function' && define.amd)
		define("EthicalJobs", ["axios"], factory);
	else if(typeof exports === 'object')
		exports["EthicalJobs"] = factory(require("axios"));
	else
		root["EthicalJobs"] = factory(root["axios"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _client = __webpack_require__(1);
	
	var _client2 = _interopRequireDefault(_client);
	
	var _endpoints = __webpack_require__(7);
	
	var endpoints = _interopRequireWildcard(_endpoints);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	|--------------------------------------------------------------------------
	| Assign endpoint functions to the prototype of the client object
	|--------------------------------------------------------------------------
	*/
	
	Object.keys(endpoints).forEach(function (endpointName) {
	  _client2.default.prototype[endpointName] = endpoints[endpointName];
	});
	
	exports.default = _client2.default;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _axios = __webpack_require__(2);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _queryString = __webpack_require__(3);
	
	var _defaultQueryParams = __webpack_require__(6);
	
	var _defaultQueryParams2 = _interopRequireDefault(_defaultQueryParams);
	
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
	  this.environments = ['production', 'development', 'test'];
	  this.environment = 'production';
	
	  this.setEnvironment(environment);
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
	      var organisationId = params && params.organisationId;
	      var requestUrl = _this.getDomain(_this.environment) + _this.generateRoute(route, organisationId);
	      var requestParams = _this.formatRequestParameters(verb, requestUrl, params);
	      return _this.dispatchRequest(requestParams);
	    };
	  });
	};
	
	/**
	 * ...
	 *
	 * @return Void
	 */
	
	Client.prototype.setEnvironment = function (environment) {
	  if (this.environments.includes(environment)) {
	    return this.environment = environment;
	  }
	  throw Error('Invalid environment value.');
	};
	
	/**
	 * ...
	 *
	 * @return Promise
	 */
	
	Client.prototype.dispatchRequest = function (params) {
	  return _axios2.default.request(params).then(function (response) {
	    return {
	      data: response && response.data && response.data.data ? response.data.data : {}
	    };
	  }).catch(function (error) {
	    return {
	      error: error && error.response && error.response.data ? error.response.data : {}
	    };
	  });
	};
	
	/**
	 * ...
	 *
	 * @return Promise
	 */
	
	Client.prototype.formatRequestParameters = function (verb, url, params) {
	  return {
	    method: verb,
	    url: url,
	    timeout: 3500,
	    data: _extends({}, _defaultQueryParams2.default, params),
	    headers: {}
	  };
	};
	
	/**
	 * ...
	 *
	 * @return Promise
	 */
	
	Client.prototype.generateRoute = function (baseRoute) {
	  var organisationId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	  if (typeof baseRoute === 'string') {
	    if (organisationId) {
	      return '/organisation/' + organisationId + baseRoute;
	    }
	    return baseRoute;
	  }
	  return '';
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
	      return 'http://api.ethicaljobs.com.au';
	    case 'test':
	      return 'http://api.ethicalstaging.com.au';
	    case 'development':
	      return 'http://api.ethicaljobs.local';
	  }
	};
	
	/**
	 * ...
	 *
	 * @return Promise
	 */
	
	Client.prototype.link = function (type, params) {
	  if (typeof type === 'string') {
	    var stringifiedParams = '';
	    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && Object.keys(params).length) {
	      stringifiedParams = '?' + (0, _queryString.stringify)(params);
	    }
	    return '/export/' + type + stringifiedParams;
	  }
	  return '';
	};
	
	/*
	|--------------------------------------------------------------------------
	| Export Client as default
	|--------------------------------------------------------------------------
	*/
	
	exports.default = Client;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(4);
	var objectAssign = __webpack_require__(5);
	
	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}
	
		return value;
	}
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
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
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});
	
		return ret;
	};
	
	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};
	
		opts = objectAssign(defaults, opts);
	
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
	
					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});
	
				return result.join('&');
			}
	
			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
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
			var test1 = new String('abc');  // eslint-disable-line
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
		} catch (e) {
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
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * ...
	 *
	 * @return Promise
	 */
	
	exports.default = {
	  limit: null,
	  since: null,
	  until: null,
	  query: '',
	  withArchived: false,
	  onlyArchived: false
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _app = __webpack_require__(8);
	
	Object.keys(_app).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _app[key];
	    }
	  });
	});
	
	var _auth = __webpack_require__(9);
	
	Object.keys(_auth).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _auth[key];
	    }
	  });
	});
	
	var _export = __webpack_require__(10);
	
	Object.keys(_export).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _export[key];
	    }
	  });
	});
	
	var _invoices = __webpack_require__(11);
	
	Object.keys(_invoices).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _invoices[key];
	    }
	  });
	});
	
	var _jobs = __webpack_require__(12);
	
	Object.keys(_jobs).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _jobs[key];
	    }
	  });
	});
	
	var _media = __webpack_require__(13);
	
	Object.keys(_media).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _media[key];
	    }
	  });
	});
	
	var _organisations = __webpack_require__(14);
	
	Object.keys(_organisations).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _organisations[key];
	    }
	  });
	});
	
	var _users = __webpack_require__(15);
	
	Object.keys(_users).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _users[key];
	    }
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialize = initialize;
	/**
	 * Fetches initial application data: taxonomies, enumerables and credit packs
	 *
	 * @public
	 * @return {Promise}
	 */
	
	function initialize() {
	  return this.get('/app/initialize', {});
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.login = login;
	exports.logout = logout;
	exports.load = load;
	exports.recover = recover;
	exports.reset = reset;
	/**
	 * Sign in a user
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function login(_ref) {
	  var login = _ref.login,
	      password = _ref.password;
	
	  return this.post('/auth/login', { login: login, password: password });
	}
	
	/**
	 * Sign out a user
	 *
	 * @public
	 * @return {Promise}
	 */
	
	function logout() {
	  return this.get('/auth/logout');
	}
	
	/**
	 * Loads a user entity from JWT token
	 *
	 * @public
	 * @return {Promise}
	 */
	
	function load() {
	  return this.get('/auth/load');
	}
	
	/**
	 * Dispatches a password recovery request
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function recover(_ref2) {
	  var email = _ref2.email;
	
	  return this.post('/auth/recover', { email: email });
	}
	
	/**
	 * Resets a users password, from a reset token
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function reset(_ref3) {
	  var username = _ref3.username,
	      password = _ref3.password,
	      password_confirmation = _ref3.password_confirmation,
	      token = _ref3.token;
	
	  return this.post('/auth/reset', { username: username, password: password, password_confirmation: password_confirmation, token: token });
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.exportUrl = exportUrl;
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * Returns an export to CSV url
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {String}
	 */
	
	function exportUrl(_ref) {
	  var type = _ref.type,
	      rest = _objectWithoutProperties(_ref, ["type"]);
	
	  return this.link(type, rest);
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.fetchInvoice = fetchInvoice;
	exports.fetchInvoices = fetchInvoices;
	exports.createInvoice = createInvoice;
	exports.updateInvoice = updateInvoice;
	exports.archiveInvoice = archiveInvoice;
	exports.purchaseCredits = purchaseCredits;
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * Fetches an invoice entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function fetchInvoice(_ref) {
	  var id = _ref.id,
	      _ref$organisationId = _ref.organisationId,
	      organisationId = _ref$organisationId === undefined ? null : _ref$organisationId,
	      params = _objectWithoutProperties(_ref, ['id', 'organisationId']);
	
	  return this.get('/invoice/' + id, _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Fetches invoice collection
	 *
	 * @public
	 * @param {Object} [params={}] request parameters
	 * @return {Promise}
	 */
	
	function fetchInvoices() {
	  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref2$organisationId = _ref2.organisationId,
	      organisationId = _ref2$organisationId === undefined ? null : _ref2$organisationId,
	      params = _objectWithoutProperties(_ref2, ['organisationId']);
	
	  return this.get('/invoices', _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Creates an invoice entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function createInvoice(_ref3) {
	  var organisation_id = _ref3.organisation_id,
	      params = _objectWithoutProperties(_ref3, ['organisation_id']);
	
	  var organisationId = organisation_id;
	  return this.post('/invoice/create', _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Updates an invoice entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function updateInvoice(_ref4) {
	  var id = _ref4.id,
	      organisation_id = _ref4.organisation_id,
	      params = _objectWithoutProperties(_ref4, ['id', 'organisation_id']);
	
	  var organisationId = organisation_id;
	  return this.post('/invoice/' + id + '/update', _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Archives an invoice entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function archiveInvoice(_ref5) {
	  var id = _ref5.id,
	      organisation_id = _ref5.organisation_id,
	      _ref5$restore = _ref5.restore,
	      restore = _ref5$restore === undefined ? false : _ref5$restore,
	      params = _objectWithoutProperties(_ref5, ['id', 'organisation_id', 'restore']);
	
	  var organisationId = organisation_id;
	  return this.post('/invoice/' + id + '/' + (restore ? 'restore' : 'delete'), _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Purchases credits for an organisation
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function purchaseCredits(_ref6) {
	  var organisationId = _ref6.organisationId,
	      params = _objectWithoutProperties(_ref6, ['organisationId']);
	
	  return this.post('/credits/purchase', _extends({ organisationId: organisationId }, params));
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.fetchJobs = fetchJobs;
	exports.fetchJob = fetchJob;
	exports.createJob = createJob;
	exports.updateJob = updateJob;
	exports.approveJob = approveJob;
	exports.expireJob = expireJob;
	exports.archiveJob = archiveJob;
	exports.attachJobMedia = attachJobMedia;
	exports.detachJobMedia = detachJobMedia;
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * Fetches job collections
	 *
	 * @public
	 * @param {Object} [params={}] request parameters
	 * @return {Promise}
	 */
	
	function fetchJobs() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$organisationId = _ref.organisationId,
	      organisationId = _ref$organisationId === undefined ? null : _ref$organisationId,
	      _ref$jobType = _ref.jobType,
	      jobType = _ref$jobType === undefined ? '' : _ref$jobType,
	      params = _objectWithoutProperties(_ref, ['organisationId', 'jobType']);
	
	  var jobTypeSegment = jobType ? '/' + jobType.toLowerCase() : '';
	  return this.get('/jobs' + jobTypeSegment, _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Fetches a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function fetchJob(_ref2) {
	  var id = _ref2.id,
	      _ref2$organisationId = _ref2.organisationId,
	      organisationId = _ref2$organisationId === undefined ? null : _ref2$organisationId,
	      params = _objectWithoutProperties(_ref2, ['id', 'organisationId']);
	
	  return this.get('/job/' + id, _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Creates a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function createJob(_ref3) {
	  var organisation_id = _ref3.organisation_id,
	      params = _objectWithoutProperties(_ref3, ['organisation_id']);
	
	  var organisationId = organisation_id;
	  return this.post('/job/create', _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Updates a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function updateJob(_ref4) {
	  var id = _ref4.id,
	      organisation_id = _ref4.organisation_id,
	      _ref4$drafting = _ref4.drafting,
	      drafting = _ref4$drafting === undefined ? false : _ref4$drafting,
	      params = _objectWithoutProperties(_ref4, ['id', 'organisation_id', 'drafting']);
	
	  var organisationId = organisation_id;
	  return this.post('/job/' + id + '/update', _extends({ organisationId: organisationId, drafting: drafting }, params));
	}
	
	/**
	 * Approves a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function approveJob(_ref5) {
	  var id = _ref5.id,
	      organisation_id = _ref5.organisation_id,
	      params = _objectWithoutProperties(_ref5, ['id', 'organisation_id']);
	
	  var organisationId = organisation_id;
	  return this.post('/job/' + id + '/approve', _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Expires a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function expireJob(_ref6) {
	  var id = _ref6.id,
	      organisation_id = _ref6.organisation_id,
	      params = _objectWithoutProperties(_ref6, ['id', 'organisation_id']);
	
	  var organisationId = organisation_id;
	  return this.post('/job/' + id + '/expire', _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Archives a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function archiveJob(_ref7) {
	  var id = _ref7.id,
	      organisation_id = _ref7.organisation_id,
	      _ref7$restore = _ref7.restore,
	      restore = _ref7$restore === undefined ? false : _ref7$restore,
	      params = _objectWithoutProperties(_ref7, ['id', 'organisation_id', 'restore']);
	
	  var organisationId = organisation_id;
	  var action = restore ? 'restore' : 'delete';
	  return this.post('/job/' + id + '/' + action, _extends({ organisationId: organisationId }, params));
	}
	
	/**
	 * Attaches media to a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function attachJobMedia(_ref8) {
	  var id = _ref8.id,
	      formData = _ref8.formData;
	
	  return this.post('/job/' + id + '/attach', formData);
	}
	
	/**
	 * Removes a media attachment from a job entity
	 *
	 * @public
	 * @param {Object} [params] request parameters
	 * @return {Promise}
	 */
	
	function detachJobMedia(_ref9) {
	  var id = _ref9.id,
	      mediaId = _ref9.mediaId;
	
	  return this.post('/job/' + id + '/detach', { media_id: mediaId });
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ethical-jobs.js.map