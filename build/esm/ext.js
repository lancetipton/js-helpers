import { i as isArr } from './isArr-3adaec3d.js';
import { i as isFunc } from './isFunc-9054cb6e.js';
import { i as isObj } from './isObj-d0afe56c.js';
import { i as isNum } from './isNum-c9e7e2d6.js';
import './isBool-f1457797.js';
import './toBool-efea676b.js';
import { i as isStr } from './isStr-90966827.js';
import './toStr-ff0731f8.js';
import { s as softFalsy } from './softFalsy-8d68283c.js';
import './toNum-d3e6ee15.js';
export { s as strToType } from './strToType-8ff6f1dc.js';
export { t as typeOf } from './typeOf-7173296e.js';

var either = function either(val1, val2, check) {
  return !isFunc(check) ? softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
};

var isEmpty = function isEmpty(val) {
  return isObj(val) ? Object.keys(val).length === 0 : isArr(val) ? val.length === 0 : isStr(val) ? val.trim().length === 0 : isNum(val) ? val < 1 : false;
};

var isSame = function isSame(val1, val2) {
  return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
};

var isValidDate = function isValidDate(date) {
  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
};

export { either, isEmpty, isSame, isValidDate };
