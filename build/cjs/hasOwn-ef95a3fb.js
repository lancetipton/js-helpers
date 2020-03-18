'use strict';

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');

var applyToFunc = function applyToFunc(item, expression) {
  if (isArr.isArr(expression)) {
    var _expression = isFunc._toArray(expression),
        func = _expression[0],
        args = _expression.slice(1);
    return func.apply(void 0, [item].concat(isFunc._toConsumableArray(args)));
  } else if (isFunc.isFunc(expression)) {
    return expression(item);
  } else {
    console.error("Pipeline expected either a function or an array (for function expressions). Found ".concat(isFunc._typeof(expression)));
    return item;
  }
};

var pipeline = function pipeline(item) {
  for (var _len = arguments.length, functions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    functions[_key - 1] = arguments[_key];
  }
  return functions.reduce(function (result, fn) {
    return applyToFunc(result, fn);
  }, item);
};

var hasOwn = function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

exports.applyToFunc = applyToFunc;
exports.hasOwn = hasOwn;
exports.pipeline = pipeline;
