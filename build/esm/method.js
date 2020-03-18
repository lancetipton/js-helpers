import { i as isArr } from './isArr-3adaec3d.js';
import { i as isFunc, _ as _toConsumableArray, c as _defineProperty, a as _slicedToArray } from './isFunc-9054cb6e.js';
export { i as isFunc } from './isFunc-9054cb6e.js';
import { i as isNum } from './isNum-c9e7e2d6.js';
export { c as cloneFunc } from './cloneFunc-db25541f.js';
import { t as typeOf } from './typeOf-7173296e.js';
import { h as hasOwn } from './hasOwn-f93f9c85.js';
export { a as applyToFunc, p as pipeline } from './hasOwn-f93f9c85.js';

var checkCall = function checkCall(method) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
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
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
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
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var params = args.slice();
  var num = params.shift();
  var bindTo = params.shift();
  var cb = params.pop();
  if (!isNum(num) || !isFunc(cb)) return [];
  var doItAmount = new Array(num);
  var responses = [];
  for (var i = 0; i < doItAmount.length; i++) {
    var data = cb.call.apply(cb, [bindTo, i].concat(_toConsumableArray(params)));
    if (data === false) break;
    responses.push(data);
  }
  return responses;
};

var memorize = function memorize(func, getCacheKey) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);
  var _memorized = function memorized() {
    var cache = _memorized.cache;
    var key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if (hasOwn(cache, key)) return cache[key];
    var result = func.apply(this, arguments);
    isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : _memorized.cache = _defineProperty({}, key, result);
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
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
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
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
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

var match = function match(matchArg) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (!args.length) return null;
  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var entry = _args[_i];
    if (!isArr(entry)) {
      console.error("Matching case must be an entry (a 2-element array). Found: ".concat(typeOf(entry)), entry);
      break;
    }
    var _entry = _slicedToArray(entry, 2),
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

export { checkCall, debounce, doIt, eitherFunc, limbo, match, memorize, throttle, throttleLast, uuid };
