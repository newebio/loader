/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var webchain = __webpack_require__(1);
	if (typeof window !== "undefined") {
	    window.webchain = webchain;
	    window.define = webchain.define.bind(webchain, true);
	}
	if (typeof module !== "undefined" && module.exports) {
	    module.exports = webchain;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(2);
	var req = __webpack_require__(6);
	var define = __webpack_require__(7);
	var evaluate = __webpack_require__(5);
	var load = __webpack_require__(8);
	var execute = __webpack_require__(11);
	var loader = {
	    config: config,
	    evaluate: evaluate,
	    define: define,
	    load: load,
	    execute: execute,
	    require: req,
	    sources: {},
	    cache: {}
	};
	loader.config();
	module.exports = loader;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ajaxLoader = __webpack_require__(3);
	var defaultConfig = {
	    loaders: {
	        ".": {
	            loader: ajaxLoader,
	            config: {
	                baseUrl: "/",
	                paths: {
	                    "*": "*"
	                }
	            }
	        },
	        npm: {
	            loader: ajaxLoader,
	            config: {
	                baseUrl: "neweb_modules",
	                paths: {
	                    "*": "*"
	                }
	            }
	        }
	    }
	};
	module.exports = function (opts) {
	    this._config = opts || defaultConfig;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var resolvePath = __webpack_require__(4);
	module.exports = function (modulePath, config, callback) {
	    var this_ = this;
	    var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
	    var xhr = new XHR();
	    xhr.open('GET', modulePath.join("/") + ".js", true);
	    xhr.onload = function () {
	        if (this.status !== 200) {
	            return callback('Error: ' + this.status);
	        }
	        this_.evaluate(this.responseText);
	        callback();
	    };
	    xhr.onerror = function () {
	        callback('Error: ' + this.status);
	    };
	    xhr.send();
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/* Get from https://github.com/systemjs/systemjs/blob/96447606dc0336f359831615ec0464ffde9f7c8f/lib/paths.js
	MIT License
	-----------

	Copyright (C) 2013-2016 Guy Bedford

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
	*/
	function paths(paths, name) {
	    // most specific (most number of slashes in path) match wins
	    var pathMatch = '',
	        wildcard,
	        maxWildcardPrefixLen = 0;

	    // check to see if we have a paths entry
	    for (var p in paths) {
	        if (paths.hasOwnProperty && !paths.hasOwnProperty(p)) continue;

	        // exact path match
	        if (p.indexOf('*') === -1) {
	            if (name == p) return paths[p];

	            // support trailing / in paths rules
	            else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && (paths[p][paths[p].length - 1] == '/' || paths[p] == '')) {
	                    return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? (paths[p] && '/' || '') + name.substr(p.length) : '');
	                }
	        }
	        // wildcard path match
	        else {
	                var pathParts = p.split('*');
	                if (pathParts.length > 2) throw new TypeError('Only one wildcard in a path is permitted');

	                var wildcardPrefixLen = pathParts[0].length;
	                if (wildcardPrefixLen >= maxWildcardPrefixLen && name.substr(0, pathParts[0].length) == pathParts[0] && name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	                    maxWildcardPrefixLen = wildcardPrefixLen;
	                    pathMatch = p;
	                    wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	                }
	            }
	    }

	    var outPath = paths[pathMatch];
	    if (typeof wildcard == 'string') outPath = outPath.replace('*', wildcard);

	    return outPath;
	}
	module.exports = paths;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (code) {
	    var define = this.define.bind(this, false);
	    _evaluate(define, code);
	};
	/* eslint-disable no-unused-vars */
	function _evaluate(define) {
	    eval(arguments[1]);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (name) {
	    if (this.cache[name]) {
	        return this.cache[name];
	    }
	    if (!this.sources[name]) {
	        throw new Error("Not found module " + name + " for require");
	    }
	    this.cache[name] = this.execute(name);
	    return this.cache[name];
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (isExecute, name, dependencies, callback) {
	    var _this = this;

	    this.load(name, dependencies, callback, function (err, resolvedName) {
	        if (isExecute) {
	            _this.require(resolvedName);
	        }
	    });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var resolveName = __webpack_require__(9);
	var resolveDepNames = __webpack_require__(10);
	module.exports = function (name, dependencies, executeCallback, callback) {
	    var _this = this;

	    var resolvedName = resolveName(name);
	    if (typeof this.cache[resolvedName] !== "undefined") {
	        /* eslint-disable no-console */
	        console.warn("Module " + resolvedName + " already exists in cache");
	        /* eslint-enable */
	    }
	    var depNames = resolveDepNames(dependencies);
	    this.sources[resolvedName] = {
	        callback: executeCallback,
	        dependencies: depNames.map(function (d) {
	            return d.join("~");
	        })
	    };
	    var i = 0;
	    if (dependencies.length == 0) {
	        callback(null, resolvedName);
	        return;
	    }
	    depNames.map(function (dep) {
	        var typeName = dep.shift();
	        var typeLoaderConfig = _this._config.loaders[typeName];
	        if (!typeLoaderConfig) {
	            throw new Error("Not found loader for type " + typeName);
	        }
	        typeLoaderConfig.loader.call(_this, dep, typeLoaderConfig.config, function (err) {
	            if (err) {
	                throw new Error(err);
	            }
	            i++;
	            if (depNames.length == i) {
	                callback(null, resolvedName);
	            }
	        });
	    });
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (fullName) {
	    return fullName.join("~");
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (deps) {
	    var names = [];
	    walk(deps, []);
	    function walk(cur, name) {
	        name = name.concat(cur[0]);
	        if (!cur[1]) {
	            names.push(name);
	            return;
	        }

	        if (typeof cur[1][0] === "string") {
	            cur[1].map(function (n) {
	                names.push(name.concat(n));
	            });
	        } else {
	            cur[1].map(function (n) {
	                walk(n, name);
	            });
	        }
	    }
	    return names;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (name) {
	    return _execute.call(undefined, this.require.bind(this), this.sources[name].dependencies, this.sources[name].callback);
	};
	/* eslint-disable no-unused-vars */
	function _execute(require, dependencies) {
	    var exports;
	    var module = {
	        exports: exports
	    };
	    //Evaluate code, because exports can be set like exports = ...
	    /*arguments[2] = arguments[2].trim();
	    if (arguments[2]) {
	        //Body of function
	        //eval("" + arguments[2].slice(arguments[2].indexOf("{") + 1, arguments[2].lastIndexOf("}")) + "");
	        eval("(" + arguments[2] + ")(dependencies, require, exports, module)");
	    }*/
	    arguments[2].call(undefined, dependencies, require, exports, module);
	    return typeof exports === "undefined" ? module.exports : exports;
	}

/***/ }
/******/ ]);