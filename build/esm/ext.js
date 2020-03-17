import './es.array.concat-2cad827a.js';
import './species-constructor-e56845e3.js';
import { i as isArr } from './array-ee263a8a.js';
import './es.object.get-prototype-of-95b6b85b.js';
import './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import { i as isObj } from './object-f4dd8b1b.js';
import './es.string.split-3996f72b.js';
import { a as isNum, f as toNum } from './number-115728d2.js';
import { i as isStr } from './string-0069576a.js';
import { isFunc } from './method.js';
import './web.timers-4a3cb5af.js';
import './es.object.get-own-property-names-e3b24cf9.js';
import './log.js';
import './collection.js';
import { softFalsy, isStrBool, toBool } from './boolean.js';

var either = function either(val1, val2, check) {
  return !isFunc(check) ? softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
};
var typeOf = function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};
var isSame = function isSame(val1, val2) {
  return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
};
var isEmpty = function isEmpty(val) {
  return isObj(val) ? Object.keys(val).length === 0 : isArr(val) ? val.length === 0 : isStr(val) ? val.trim().length === 0 : isNum(val) ? val < 1 : false;
};
var isValidDate = function isValidDate(date) {
  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
};
var strToType = function strToType(val) {
  return !val || !isStr(val) ? val : isStrBool(val) ? toBool(val) : isNum(val) ? toNum(val) : function () {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }();
};

export { either, isEmpty, isSame, isValidDate, strToType, typeOf };
