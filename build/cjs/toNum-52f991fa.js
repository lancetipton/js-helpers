'use strict';

var isNum = require('./isNum-e8ce2740.js');
var toStr = require('./toStr-ad9e855c.js');

var getNums = function getNums(val) {
  return toStr.toStr(val).replace(/([^.\d])/gm, '');
};

var toNum = function toNum(val) {
  return isNum.isNum(val) ? val : val && !isNum.equalsNaN(val) && Number(getNums(val)) || 0;
};

exports.getNums = getNums;
exports.toNum = toNum;
