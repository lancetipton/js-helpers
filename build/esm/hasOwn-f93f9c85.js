import { i as isArr } from './isArr-3adaec3d.js';
import { f as _toArray, _ as _toConsumableArray, i as isFunc, d as _typeof } from './isFunc-9054cb6e.js';

var applyToFunc = function applyToFunc(item, expression) {
  if (isArr(expression)) {
    var _expression = _toArray(expression),
        func = _expression[0],
        args = _expression.slice(1);
    return func.apply(void 0, [item].concat(_toConsumableArray(args)));
  } else if (isFunc(expression)) {
    return expression(item);
  } else {
    console.error("Pipeline expected either a function or an array (for function expressions). Found ".concat(_typeof(expression)));
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

export { applyToFunc as a, hasOwn as h, pipeline as p };
