import { i as isFunc } from './isFunc-9054cb6e.js';
import { i as isObj } from './isObj-d0afe56c.js';

var promisify = function promisify(method) {
  if (!isFunc(method)) throw "Argument must be a function";
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function (res, rej) {
      if (!isFunc(args[args.length - 1])) return res(method.apply(void 0, args));
      args.pop();
      args.push(function () {
        for (var _len2 = arguments.length, cbData = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          cbData[_key2] = arguments[_key2];
        }
        return cbData && cbData[0] ? rej.apply(void 0, cbData) : res.apply(void 0, cbData);
      });
      return method.apply(void 0, args);
    });
  };
};

var defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce(function (map, functionName) {
  map[functionName] = true;
  return map;
}, {});
var addAsync = function addAsync(object) {
  if (!object.__IS_PROMISIFIED__) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
      for (var _iterator = Object.getOwnPropertyNames(object)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prop = _step.value;
        var isAsync = prop.indexOf('Async') !== -1 || object["".concat(prop, "Async")];
        if (isAsync || defObjProps[prop]) continue;
        if (isFunc(object[prop])) object["".concat(prop, "Async")] = promisify(object[prop]);else {
          var getValue = Object.getOwnPropertyDescriptor(object, prop).get;
          if (isFunc(getValue)) object["".concat(prop, "Async")] = promisify(getValue);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    object.__IS_PROMISIFIED__ = true;
  }
  return object;
};
var promisifyAll = function promisifyAll(object) {
  if (!isObj(object)) return object;
  addAsync(object);
  var proto = Object.getPrototypeOf(object);
  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
  return object;
};

var wait = function wait(time) {
  return new Promise(function (res, rej) {
    return setTimeout(function () {
      return res(true);
    }, time);
  });
};

export { promisify, promisifyAll, wait };
