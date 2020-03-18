'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');
var isNum = require('./isNum-e8ce2740.js');
var isStr = require('./isStr-1e4ba1f4.js');
var isColl = require('./isColl-28b48873.js');
var updateColl = require('./updateColl-5bfa896d.js');
var get = require('./get-f8e8d8de.js');
var deepClone = require('./deepClone-75d63e18.js');
require('./cloneFunc-d8134d8a.js');

var isEmptyColl = function isEmptyColl(obj) {
  return isArr.isArr(obj) ? obj.length === 0 : isColl.isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
};

var mapColl = function mapColl(coll, cb) {
  return isFunc.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).map(function (key) {
    return cb(key, coll[key], coll);
  }) : isArr.isArr(coll) ? [] : {};
};

var reduceColl = function reduceColl(coll, cb, reduce) {
  return isFunc.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).reduce(function (data, key) {
    return cb(key, coll[key], coll, data);
  }, reduce) : isArr.isArr(coll) ? [] : {};
};

var unset = function unset(obj, path) {
  return updateColl.updateColl(obj, path, 'unset');
};

var repeat = function repeat(element, times) {
  var cloneDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!times || times <= 0) return [];
  if (!isNum.isNum(times)) {
    console.error("Times argument must be a number");
    return [];
  }
  var arr = [];
  for (var i = 0; i < times; i++) {
    var value = isFunc.isFunc(element) ? element() : cloneDeep ? deepClone.deepClone(element) : element;
    arr.push(value);
  }
  return arr;
};

var shallowEqual = function shallowEqual(col1, col2, path) {
  if (path && (isArr.isArr(path) || isStr.isStr(path))) {
    col1 = get.get(col1, path);
    col2 = get.get(col2, path);
  }
  if (col1 === col2) return true;
  if (!col1 || !isColl.isColl(col1) || !col2 || !isColl.isColl(col2)) return false;
  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
  for (var key in col1) {
    if (col1[key] !== col2[key]) return false;
  }
  return true;
};

exports.isColl = isColl.isColl;
exports.get = get.get;
exports.cloneObjWithPrototypeAndProperties = deepClone.cloneObjWithPrototypeAndProperties;
exports.deepClone = deepClone.deepClone;
exports.set = deepClone.set;
exports.isEmptyColl = isEmptyColl;
exports.mapColl = mapColl;
exports.reduceColl = reduceColl;
exports.repeat = repeat;
exports.shallowEqual = shallowEqual;
exports.unset = unset;
