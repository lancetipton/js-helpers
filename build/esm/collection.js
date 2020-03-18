import { i as isArr } from './isArr-3adaec3d.js';
import { i as isFunc } from './isFunc-9054cb6e.js';
import { i as isNum } from './isNum-c9e7e2d6.js';
import { i as isStr } from './isStr-90966827.js';
import { i as isColl } from './isColl-66968d37.js';
export { i as isColl } from './isColl-66968d37.js';
import { u as updateColl } from './updateColl-4f0fb406.js';
import { g as get } from './get-5ee64b9f.js';
export { g as get } from './get-5ee64b9f.js';
import { d as deepClone } from './deepClone-66817196.js';
export { c as cloneObjWithPrototypeAndProperties, d as deepClone, s as set } from './deepClone-66817196.js';
import './cloneFunc-db25541f.js';

var isEmptyColl = function isEmptyColl(obj) {
  return isArr(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
};

var mapColl = function mapColl(coll, cb) {
  return isFunc(cb) && isColl(coll) ? Object.keys(coll).map(function (key) {
    return cb(key, coll[key], coll);
  }) : isArr(coll) ? [] : {};
};

var reduceColl = function reduceColl(coll, cb, reduce) {
  return isFunc(cb) && isColl(coll) ? Object.keys(coll).reduce(function (data, key) {
    return cb(key, coll[key], coll, data);
  }, reduce) : isArr(coll) ? [] : {};
};

var unset = function unset(obj, path) {
  return updateColl(obj, path, 'unset');
};

var repeat = function repeat(element, times) {
  var cloneDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!times || times <= 0) return [];
  if (!isNum(times)) {
    console.error("Times argument must be a number");
    return [];
  }
  var arr = [];
  for (var i = 0; i < times; i++) {
    var value = isFunc(element) ? element() : cloneDeep ? deepClone(element) : element;
    arr.push(value);
  }
  return arr;
};

var shallowEqual = function shallowEqual(col1, col2, path) {
  if (path && (isArr(path) || isStr(path))) {
    col1 = get(col1, path);
    col2 = get(col2, path);
  }
  if (col1 === col2) return true;
  if (!col1 || !isColl(col1) || !col2 || !isColl(col2)) return false;
  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
  for (var key in col1) {
    if (col1[key] !== col2[key]) return false;
  }
  return true;
};

export { isEmptyColl, mapColl, reduceColl, repeat, shallowEqual, unset };
