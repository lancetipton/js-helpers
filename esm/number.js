/** @module number */
'use strict';

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNum = exports.toInt = exports.toFloat = exports.nth = exports.isNum = exports.isInt = exports.isFloat = exports.getNums = exports.equalsNaN = void 0;

var _string = require("./string");

var equalsNaN = function equalsNaN(val) {
  return typeof val === 'number' && val != val;
};
/**
 * Gets numbers and floats (.) from a string.
 * @example
 * getNums('$1.23')
 * // Returns '1.23'
 * @function
 * @param {*} val - value to pull numbers from
 * @return {string} Numbers found in value
 */


exports.equalsNaN = equalsNaN;

var getNums = function getNums(val) {
  return (0, _string.toStr)(val).replace(/([^.\d])/gm, '');
};
/**
 * Checks if a number is a Float.
 * @example
 * isFloat(1.23)
 * // Returns true
 * @example
 * isFloat('1.2')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} num - value to check
 * @return {boolean} true or false - value is an Float
 */


exports.getNums = getNums;

var isFloat = function isFloat(val) {
  return isNum(val) && val % 1 !== 0;
};
/**
 * Checks if a number is an integer.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} num - value to check
 * @return {boolean} true or false - value is an Int
 */


exports.isFloat = isFloat;

var isInt = function isInt(val) {
  return isNum(val) && val % 1 === 0;
};
/**
 * Checks is value is a number.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt(NaN)
 * // Returns false
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} val - value to check if is a number
 * @return {boolean} T/F - if value is a number
 */


exports.isInt = isInt;

var isNum = function isNum(val) {
  return typeof val === 'number' && !equalsNaN(val);
};
/**
 * Finds the number ext base on the passed in number.
 * @example
 * nth(1)
 * // Returns 'st'
 * @example
 * nth(2)
 * // Returns 'nd'
 * @example
 * nth(5)
 * // Returns 'th'
 * @function
 * @param {number} num - value to check
 * @return {string} ext of the number
 */


exports.isNum = isNum;

var nth = function nth(num) {
  if (!isNum(num)) {
    num = getNums(num);
    if (!num) return '';
    num = toNum(num);
    if (equalsNaN(num)) return '';
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
/**
 * Converts passed in value to a float.
 * @example
 * toFloat('1.34')
 * // Returns 1.34
* @example
 * toFloat(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to an float
 */


exports.nth = nth;

var toFloat = function toFloat(val) {
  return val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;
};
/**
 * Converts passed in value to an integer.
 * @example
 * toInt('1')
 * // Returns 1
 * @example
 * toInt(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a integer
 */


exports.toFloat = toFloat;

var toInt = function toInt(val) {
  return val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;
};
/**
 * Converts passed in value to a number.
 * @example
 * toNum("23")
 * // Returns 23
 * @example
 * toNum(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a float
 */


exports.toInt = toInt;

var toNum = function toNum(val) {
  return isNum(val) ? val : val && !equalsNaN(val) && Number(getNums(val)) || 0;
};

exports.toNum = toNum;