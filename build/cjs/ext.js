'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');
var isObj = require('./isObj-ffedee44.js');
var isNum = require('./isNum-e8ce2740.js');
require('./isBool-102c91d0.js');
require('./toBool-5478ef10.js');
var isStr = require('./isStr-1e4ba1f4.js');
require('./toStr-ad9e855c.js');
var softFalsy = require('./softFalsy-cb2c001d.js');
require('./toNum-52f991fa.js');
var strToType = require('./strToType-c04fb9b0.js');
var typeOf = require('./typeOf-273242b3.js');

var either = function either(val1, val2, check) {
  return !isFunc.isFunc(check) ? softFalsy.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
};

var isEmpty = function isEmpty(val) {
  return isObj.isObj(val) ? Object.keys(val).length === 0 : isArr.isArr(val) ? val.length === 0 : isStr.isStr(val) ? val.trim().length === 0 : isNum.isNum(val) ? val < 1 : false;
};

var isSame = function isSame(val1, val2) {
  return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
};

var isValidDate = function isValidDate(date) {
  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
};

exports.strToType = strToType.strToType;
exports.typeOf = typeOf.typeOf;
exports.either = either;
exports.isEmpty = isEmpty;
exports.isSame = isSame;
exports.isValidDate = isValidDate;
