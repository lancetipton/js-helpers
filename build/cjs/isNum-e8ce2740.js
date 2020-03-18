'use strict';

var equalsNaN = function equalsNaN(val) {
  return typeof val === 'number' && val != val;
};

var isNum = function isNum(val) {
  return typeof val === 'number' && !equalsNaN(val);
};

exports.equalsNaN = equalsNaN;
exports.isNum = isNum;
