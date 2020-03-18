'use strict';

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');
var isColl = require('./isColl-28b48873.js');

var updateColl = function updateColl(obj, path, type, val) {
  var org = obj;
  if (!isColl.isColl(obj) || !obj || !path) return type !== 'set' && val || undefined;
  var parts = isArr.isArr(path) ? Array.from(path) : path.split('.');
  var key = parts.pop();
  var prop;
  var breakPath;
  var _loop = function _loop() {
    var next = obj[prop];
    isColl.isColl(next) || isFunc.isFunc(next) ? obj = next : function () {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = next;
    }();
    if (breakPath) return {
      v: val
    };
  };
  while (prop = parts.shift()) {
    var _ret = _loop();
    if (isFunc._typeof(_ret) === "object") return _ret.v;
  }
  return type === 'get'
  ? key in obj ? obj[key] : val : type === 'unset'
  ? delete obj[key] :
  (obj[key] = val) && org || org;
};

exports.updateColl = updateColl;
