'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isNum = require('./isNum-c7164b50.js');
var isNonNegative = require('./isNonNegative-9959647c.js');
require('./isStr-8a57710e.js');
require('./toStr-8e499966.js');
var toNum = require('./toNum-eeb2e51e.js');

const isFloat = val => isNum.isNum(val) && val % 1 !== 0;

const isInt = val => isNum.isNum(val) && val % 1 === 0;

const nth = num => {
  if (!isNum.isNum(num)) {
    num = toNum.getNums(num);
    if (!num) return '';
    num = toNum.toNum(num);
    if (isNum.equalsNaN(num)) return '';
  }
  const mod = num % 100;
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

const toFloat = val => val && !isNum.equalsNaN(val) && parseFloat(isNum.isNum(val) && val || toNum.getNums(val)) || 0;

const toInt = val => val && !isNum.equalsNaN(val) && parseInt(isNum.isNum(val) && val || toNum.getNums(val)) || 0;

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
