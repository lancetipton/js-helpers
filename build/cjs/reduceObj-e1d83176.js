'use strict';

var isFunc = require('./isFunc-cafb7691.js');
var isObj = require('./isObj-ffedee44.js');

var reduceObj = function reduceObj(obj, cb) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return isObj.isObj(obj) && isFunc.isFunc(cb) && Object.entries(obj).reduce(function (data, _ref) {
    var _ref2 = isFunc._slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    return cb(key, value, data);
  }, start) || start;
};

exports.reduceObj = reduceObj;
