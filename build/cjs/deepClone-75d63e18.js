'use strict';

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');
var updateColl = require('./updateColl-5bfa896d.js');
var cloneFunc = require('./cloneFunc-d8134d8a.js');

var set = function set(obj, path, val) {
  return updateColl.updateColl(obj, path, 'set', val);
};

var deepClone = function deepClone(obj) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  if (isArr.isArr(obj)) return obj.map(function (x) {
    return deepClone(x);
  });
  if (isFunc.isFunc(obj)) return cloneFunc.cloneFunc(obj);
  var result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null;
  if (result === null) return cloneObjWithPrototypeAndProperties(obj);
  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, function (_ref) {
    var _ref2 = isFunc._slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];
    return result.set(key, deepClone(val, hash));
  });
  return Object.assign.apply(Object, [result].concat(isFunc._toConsumableArray(Object.keys(obj).map(function (key) {
    return isFunc._defineProperty({}, key, deepClone(obj[key], hash));
  }))));
};
var cloneObjWithPrototypeAndProperties = function cloneObjWithPrototypeAndProperties(objectWithPrototype) {
  if (!objectWithPrototype) return objectWithPrototype;
  var prototype = Object.getPrototypeOf(objectWithPrototype);
  var sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);
  for (var _i = 0, _Object$entries = Object.entries(sourceDescriptors); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = isFunc._slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        descriptor = _Object$entries$_i[1];
    sourceDescriptors[key].value = deepClone(descriptor.value);
  }
  var clone = Object.create(prototype, sourceDescriptors);
  if (Object.isFrozen(objectWithPrototype)) Object.freeze(clone);
  if (Object.isSealed(objectWithPrototype)) Object.seal(clone);
  return clone;
};

exports.cloneObjWithPrototypeAndProperties = cloneObjWithPrototypeAndProperties;
exports.deepClone = deepClone;
exports.set = set;
