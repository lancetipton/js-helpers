import { i as isBool } from './isBool-f1457797.js';
import { t as toStr } from './toStr-ff0731f8.js';

var isStrBool = function isStrBool(val) {
  return val === 'false' || val === 'true';
};

var convertToStrBool = function convertToStrBool(val) {
  return isBool(val) ? toStr(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';
};

var toBool = function toBool(val) {
  return isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';
};

export { convertToStrBool as c, isStrBool as i, toBool as t };
