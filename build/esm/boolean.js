import './es.array.concat-2cad827a.js';
import './species-constructor-e56845e3.js';
import './array-ee263a8a.js';
import './es.object.get-prototype-of-95b6b85b.js';
import './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import './object-f4dd8b1b.js';
import './es.string.split-3996f72b.js';
import './number-115728d2.js';
import { t as toStr } from './string-0069576a.js';
import './method.js';
import './web.timers-4a3cb5af.js';
import './es.object.get-own-property-names-e3b24cf9.js';
import './log.js';
import './collection.js';
import './ext.js';

var isBool = function isBool(val) {
  return typeof val === 'boolean';
};
var isStrBool = function isStrBool(val) {
  return val === 'false' || val === 'true';
};
var convertToStrBool = function convertToStrBool(val) {
  return isBool(val) ? toStr(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';
};
var softFalsy = function softFalsy(val) {
  return Boolean(val || val === '' || val === 0);
};
var toBool = function toBool(val) {
  return isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';
};

export { convertToStrBool, isBool, isStrBool, softFalsy, toBool };
