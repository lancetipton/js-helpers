'use strict';

var isNum = require('./isNum-e8ce2740.js');

var isNonNegative = function isNonNegative(val) {
  return isNum.isNum(val) && val >= 0;
};

exports.isNonNegative = isNonNegative;
