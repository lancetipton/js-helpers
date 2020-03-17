'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./es.array.concat-207a854d.js');
require('./species-constructor-736ba485.js');
var array = require('./array-411f3373.js');
require('./es.object.get-prototype-of-38cc319f.js');
require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.array.index-of-043c7818.js');
var object = require('./object-38f445e5.js');
require('./es.string.split-893ff521.js');
var number = require('./number-a23c768f.js');
var string = require('./string-70ad3fa2.js');
var method = require('./method.js');
require('./web.timers-37faa3ac.js');
require('./es.object.get-own-property-names-7a04c850.js');
require('./log.js');
require('./collection.js');
var boolean = require('./boolean.js');

var either = function either(val1, val2, check) {
  return !method.isFunc(check) ? boolean.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
};
var typeOf = function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};
var isSame = function isSame(val1, val2) {
  return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
};
var isEmpty = function isEmpty(val) {
  return object.isObj(val) ? Object.keys(val).length === 0 : array.isArr(val) ? val.length === 0 : string.isStr(val) ? val.trim().length === 0 : number.isNum(val) ? val < 1 : false;
};
var isValidDate = function isValidDate(date) {
  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
};
var strToType = function strToType(val) {
  return !val || !string.isStr(val) ? val : boolean.isStrBool(val) ? boolean.toBool(val) : number.isNum(val) ? number.toNum(val) : function () {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }();
};

exports.either = either;
exports.isEmpty = isEmpty;
exports.isSame = isSame;
exports.isValidDate = isValidDate;
exports.strToType = strToType;
exports.typeOf = typeOf;
