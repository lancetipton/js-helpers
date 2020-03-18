import { i as isNum, e as equalsNaN } from './isNum-c9e7e2d6.js';
import { t as toStr } from './toStr-ff0731f8.js';

var getNums = function getNums(val) {
  return toStr(val).replace(/([^.\d])/gm, '');
};

var toNum = function toNum(val) {
  return isNum(val) ? val : val && !equalsNaN(val) && Number(getNums(val)) || 0;
};

export { getNums as g, toNum as t };
