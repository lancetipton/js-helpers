'use strict';

var isStr = require('./isStr-1e4ba1f4.js');

var toStr = function toStr(val) {
  return val === null || val === undefined ? '' : isStr.isStr(val) ? val : JSON.stringify(val);
};

exports.toStr = toStr;
