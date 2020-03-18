import { i as isNum } from './isNum-c9e7e2d6.js';

var isNonNegative = function isNonNegative(val) {
  return isNum(val) && val >= 0;
};

export { isNonNegative as i };
