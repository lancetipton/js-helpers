import { i as isFunc, a as _slicedToArray } from './isFunc-9054cb6e.js';
import { i as isObj } from './isObj-d0afe56c.js';

var reduceObj = function reduceObj(obj, cb) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return isObj(obj) && isFunc(cb) && Object.entries(obj).reduce(function (data, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    return cb(key, value, data);
  }, start) || start;
};

export { reduceObj as r };
