'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isNum = require('./isNum-e8ce2740.js');
var isNonNegative = require('./isNonNegative-e4e43dcb.js');
require('./isStr-1e4ba1f4.js');
require('./toStr-ad9e855c.js');
var toNum = require('./toNum-52f991fa.js');

var isFloat = function isFloat(val) {
  return isNum.isNum(val) && val % 1 !== 0;
};

var isInt = function isInt(val) {
  return isNum.isNum(val) && val % 1 === 0;
};

var nth = function nth(num) {
  if (!isNum.isNum(num)) {
    num = toNum.getNums(num);
    if (!num) return '';
    num = toNum.toNum(num);
    if (isNum.equalsNaN(num)) return '';
  }
  var mod = num % 100;
  if (mod >= 10 && mod <= 20) return 'th';
  switch (num % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

var toFloat = function toFloat(val) {
  return val && !isNum.equalsNaN(val) && parseFloat(isNum.isNum(val) && val || toNum.getNums(val)) || 0;
};

var toInt = function toInt(val) {
  return val && !isNum.equalsNaN(val) && parseInt(isNum.isNum(val) && val || toNum.getNums(val)) || 0;
};

exports.equalsNaN = isNum.equalsNaN;
exports.isNum = isNum.isNum;
exports.isNonNegative = isNonNegative.isNonNegative;
exports.getNums = toNum.getNums;
exports.toNum = toNum.toNum;
exports.isFloat = isFloat;
exports.isInt = isInt;
exports.nth = nth;
exports.toFloat = toFloat;
exports.toInt = toInt;
