'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var es_array_concat = require('./es.array.concat-207a854d.js');
require('./species-constructor-736ba485.js');
var array = require('./array-411f3373.js');
require('./es.object.get-prototype-of-38cc319f.js');
require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.array.index-of-043c7818.js');
var object = require('./object-38f445e5.js');
var es_string_split = require('./es.string.split-893ff521.js');
var number = require('./number-a23c768f.js');
require('./string-70ad3fa2.js');
require('./web.timers-37faa3ac.js');
require('./es.object.get-own-property-names-7a04c850.js');
require('./log.js');
require('./collection.js');
require('./boolean.js');
var ext = require('./ext.js');

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  es_array_concat.redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var defineProperty = es_array_concat.objectDefinePropertyModule.f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';
if (es_array_concat.DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

es_array_concat.$({ target: 'Object', stat: true, forced: !es_array_concat.DESCRIPTORS, sham: !es_array_concat.DESCRIPTORS }, {
  defineProperty: es_array_concat.objectDefinePropertyModule.f
});

var TO_STRING$1 = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING$1];
var NOT_GENERIC = es_array_concat.fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
var INCORRECT_NAME = nativeToString.name != TO_STRING$1;
if (NOT_GENERIC || INCORRECT_NAME) {
  es_array_concat.redefine(RegExp.prototype, TO_STRING$1, function toString() {
    var R = es_array_concat.anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? es_string_split.regExpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

var pipeline = function pipeline(item) {
  for (var _len = arguments.length, functions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    functions[_key - 1] = arguments[_key];
  }
  return functions.reduce(function (result, fn) {
    return applyToFunc(result, fn);
  }, item);
};
var applyToFunc = function applyToFunc(item, expression) {
  if (array.isArr(expression)) {
    var _expression = object._toArray(expression),
        func = _expression[0],
        args = _expression.slice(1);
    return func.apply(void 0, [item].concat(object._toConsumableArray(args)));
  } else if (isFunc(expression)) {
    return expression(item);
  } else {
    console.error("Pipeline expected either a function or an array (for function expressions). Found ".concat(object._typeof(expression)));
    return item;
  }
};
var checkCall = function checkCall(method) {
  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }
  return isFunc(method) && method.apply(void 0, params) || undefined;
};
var eitherFunc = function eitherFunc(func1, func2) {
  return isFunc(func1) && func1 || func2;
};
var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  function wrapFunc() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    if (!isFunc(func)) return null;
    var context = this;
    var later = function later() {
      timeout = null;
      !immediate && func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) return isFunc(func) && func.apply(context, args);
  }
  return wrapFunc;
};
var doIt = function doIt() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }
  var params = args.slice();
  var num = params.shift();
  var bindTo = params.shift();
  var cb = params.pop();
  if (!number.isNum(num) || !isFunc(cb)) return [];
  var doItAmount = new Array(num);
  var responses = [];
  for (var i = 0; i < doItAmount.length; i++) {
    var data = cb.call.apply(cb, [bindTo, i].concat(object._toConsumableArray(params)));
    if (data === false) break;
    responses.push(data);
  }
  return responses;
};
var isFunc = function isFunc(func) {
  return typeof func === 'function';
};
var memorize = function memorize(func, getCacheKey) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);
  var _memorized = function memorized() {
    var cache = _memorized.cache;
    var key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if (object.hasOwn(cache, key)) return cache[key];
    var result = func.apply(this, arguments);
    number.isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : _memorized.cache = object._defineProperty({}, key, result);
    return result;
  };
  _memorized.cache = {};
  _memorized.destroy = function () {
    getCacheKey = undefined;
    _memorized.cache = undefined;
    _memorized.destroy = undefined;
    _memorized = undefined;
  };
  return _memorized;
};
var throttle = function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var waiting = false;
  return function () {
    if (waiting) return;
    waiting = true;
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    func.apply(this, args);
    return setTimeout(function () {
      waiting = false;
    }, wait);
  };
};
var throttleLast = function throttleLast(func, cb) {
  var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var throttleTimeout;
  return function () {
    var _this = this;
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    if (throttleTimeout) clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(function () {
      func.apply(_this, args);
      clearTimeout(throttleTimeout);
    }, wait);
    typeof cb === 'function' && cb();
  };
};
var limbo = function limbo(promise) {
  return !promise || !isFunc(promise.then) ? [new Error("A promise or thenable is required as the first argument!"), null] : promise.then(function (data) {
    return [null, data];
  })["catch"](function (err) {
    return [err, undefined];
  });
};
var uuid = function uuid(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};
var cloneFunc = function cloneFunc(func) {
  var funcRef = func;
  var funcWrap = function funcWrap() {
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return object._construct(funcRef, args);
  };
  var funcClone = function funcClone() {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    return func instanceof funcClone ? funcWrap.apply(null, args) : funcRef.apply(func, args);
  };
  for (var key in func) {
    func.hasOwnProperty(key) && (funcClone[key] = func[key]);
  }
  Object.defineProperty(funcClone, 'name', {
    value: func.name,
    configurable: true
  });
  funcClone.toString = function () {
    return func.toString();
  };
  return funcClone;
};
var match = function match(matchArg) {
  for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
    args[_key9 - 1] = arguments[_key9];
  }
  if (!args.length) return null;
  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var entry = _args[_i];
    if (!array.isArr(entry)) {
      console.error("Matching case must be an entry (a 2-element array). Found: ".concat(ext.typeOf(entry)), entry);
      break;
    }
    var _entry = object._slicedToArray(entry, 2),
        caseValueOrPredicate = _entry[0],
        valueOnMatch = _entry[1];
    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch;
    if (caseValueOrPredicate === matchArg) return valueOnMatch;
  }
  return null;
};
match["default"] = function () {
  return true;
};

exports.applyToFunc = applyToFunc;
exports.checkCall = checkCall;
exports.cloneFunc = cloneFunc;
exports.debounce = debounce;
exports.doIt = doIt;
exports.eitherFunc = eitherFunc;
exports.isFunc = isFunc;
exports.limbo = limbo;
exports.match = match;
exports.memorize = memorize;
exports.pipeline = pipeline;
exports.throttle = throttle;
exports.throttleLast = throttleLast;
exports.uuid = uuid;
