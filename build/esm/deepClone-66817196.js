import { i as isArr } from './isArr-3adaec3d.js';
import { i as isFunc, a as _slicedToArray, _ as _toConsumableArray, c as _defineProperty } from './isFunc-9054cb6e.js';
import { u as updateColl } from './updateColl-4f0fb406.js';
import { c as cloneFunc } from './cloneFunc-db25541f.js';

var set = function set(obj, path, val) {
  return updateColl(obj, path, 'set', val);
};

var deepClone = function deepClone(obj) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  if (isArr(obj)) return obj.map(function (x) {
    return deepClone(x);
  });
  if (isFunc(obj)) return cloneFunc(obj);
  var result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null;
  if (result === null) return cloneObjWithPrototypeAndProperties(obj);
  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];
    return result.set(key, deepClone(val, hash));
  });
  return Object.assign.apply(Object, [result].concat(_toConsumableArray(Object.keys(obj).map(function (key) {
    return _defineProperty({}, key, deepClone(obj[key], hash));
  }))));
};
var cloneObjWithPrototypeAndProperties = function cloneObjWithPrototypeAndProperties(objectWithPrototype) {
  if (!objectWithPrototype) return objectWithPrototype;
  var prototype = Object.getPrototypeOf(objectWithPrototype);
  var sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);
  for (var _i = 0, _Object$entries = Object.entries(sourceDescriptors); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        descriptor = _Object$entries$_i[1];
    sourceDescriptors[key].value = deepClone(descriptor.value);
  }
  var clone = Object.create(prototype, sourceDescriptors);
  if (Object.isFrozen(objectWithPrototype)) Object.freeze(clone);
  if (Object.isSealed(objectWithPrototype)) Object.seal(clone);
  return clone;
};

export { cloneObjWithPrototypeAndProperties as c, deepClone as d, set as s };
