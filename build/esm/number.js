import { i as isNum, e as equalsNaN } from './isNum-c9e7e2d6.js';
export { e as equalsNaN, i as isNum } from './isNum-c9e7e2d6.js';
export { i as isNonNegative } from './isNonNegative-e4ab7190.js';
import './isStr-90966827.js';
import './toStr-ff0731f8.js';
import { g as getNums, t as toNum } from './toNum-d3e6ee15.js';
export { g as getNums, t as toNum } from './toNum-d3e6ee15.js';

var isFloat = function isFloat(val) {
  return isNum(val) && val % 1 !== 0;
};

var isInt = function isInt(val) {
  return isNum(val) && val % 1 === 0;
};

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

var toFloat = function toFloat(val) {
  return val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;
};

var toInt = function toInt(val) {
  return val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;
};

export { isFloat, isInt, nth, toFloat, toInt };
