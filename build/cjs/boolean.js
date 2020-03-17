'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./es.array.concat-207a854d.js');
require('./species-constructor-736ba485.js');
require('./array-411f3373.js');
require('./es.object.get-prototype-of-38cc319f.js');
require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.array.index-of-043c7818.js');
require('./object-38f445e5.js');
require('./es.string.split-893ff521.js');
require('./number-a23c768f.js');
var string = require('./string-70ad3fa2.js');
require('./method.js');
require('./web.timers-37faa3ac.js');
require('./es.object.get-own-property-names-7a04c850.js');
require('./log.js');
require('./collection.js');
require('./ext.js');

var isBool = function isBool(val) {
  return typeof val === 'boolean';
};
var isStrBool = function isStrBool(val) {
  return val === 'false' || val === 'true';
};
var convertToStrBool = function convertToStrBool(val) {
  return isBool(val) ? string.toStr(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';
};
var softFalsy = function softFalsy(val) {
  return Boolean(val || val === '' || val === 0);
};
var toBool = function toBool(val) {
  return isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';
};

exports.convertToStrBool = convertToStrBool;
exports.isBool = isBool;
exports.isStrBool = isStrBool;
exports.softFalsy = softFalsy;
exports.toBool = toBool;
