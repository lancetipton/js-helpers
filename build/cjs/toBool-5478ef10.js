'use strict';

var isBool = require('./isBool-102c91d0.js');
var toStr = require('./toStr-ad9e855c.js');

var isStrBool = function isStrBool(val) {
  return val === 'false' || val === 'true';
};

var convertToStrBool = function convertToStrBool(val) {
  return isBool.isBool(val) ? toStr.toStr(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';
};

var toBool = function toBool(val) {
  return isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';
};

exports.convertToStrBool = convertToStrBool;
exports.isStrBool = isStrBool;
exports.toBool = toBool;
