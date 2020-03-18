'use strict';

var isNum = require('./isNum-e8ce2740.js');
var toBool = require('./toBool-5478ef10.js');
var isStr = require('./isStr-1e4ba1f4.js');
var toNum = require('./toNum-52f991fa.js');

var strToType = function strToType(val) {
  return !val || !isStr.isStr(val) ? val : toBool.isStrBool(val) ? toBool.toBool(val) : isNum.isNum(val) ? toNum.toNum(val) : function () {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }();
};

exports.strToType = strToType;
