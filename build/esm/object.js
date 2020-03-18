import { i as isArr } from './isArr-3adaec3d.js';
import { d as _typeof, i as isFunc, a as _slicedToArray, _ as _toConsumableArray, b as _objectSpread2, c as _defineProperty } from './isFunc-9054cb6e.js';
import { i as isObj } from './isObj-d0afe56c.js';
export { i as isObj } from './isObj-d0afe56c.js';
import { i as isNum } from './isNum-c9e7e2d6.js';
import './isBool-f1457797.js';
import './toBool-efea676b.js';
import { i as isStr } from './isStr-90966827.js';
import './toStr-ff0731f8.js';
import { i as isColl } from './isColl-66968d37.js';
import './updateColl-4f0fb406.js';
import { s as set, d as deepClone } from './deepClone-66817196.js';
import './cloneFunc-db25541f.js';
import './toNum-d3e6ee15.js';
import { s as strToType } from './strToType-8ff6f1dc.js';
import { logData } from './log.js';
import { p as pipeline } from './hasOwn-f93f9c85.js';
export { h as hasOwn } from './hasOwn-f93f9c85.js';
import { r as reduceObj } from './reduceObj-ce655425.js';
export { r as reduceObj } from './reduceObj-ce655425.js';
import { s as sanitize } from './sanitize-42a6d642.js';

var cloneJson = function cloneJson(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    logData(e.message, 'error');
    return null;
  }
};

var isEntry = function isEntry(maybeEntry) {
  return isArr(maybeEntry) && maybeEntry.length === 2 && (isNum(maybeEntry[0]) || isStr(maybeEntry[0]));
};

var mapEntries = function mapEntries(obj, cb) {
  if (!isArr(obj) && !isObj(obj)) {
    console.error(obj, "Expected array or object for obj. Found ".concat(_typeof(obj)));
    return obj;
  }
  if (!isFunc(cb)) {
    console.error("Expected function for cb. Found ".concat(_typeof(cb)));
    return obj;
  }
  var entries = Object.entries(obj);
  var initialValue = isArr(obj) ? [] : {};
  return entries.reduce(function (obj, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    var result = cb(key, value);
    if (!isEntry(result)) {
      console.error("Callback function must return entry. Found: ".concat(result, ". Using current entry instead."));
      return set(obj, key, value);
    }
    return set(obj, result[0], result[1]);
  }, initialValue);
};

var mapKeys = function mapKeys(obj, keyMapper) {
  if (!isObj(obj) || !isFunc(keyMapper)) return obj;
  return mapEntries(obj, function (key, value) {
    return [keyMapper(key), value];
  });
};

var clearObj = function clearObj(obj, filter) {
  obj && Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    if (filter && filter.indexOf(key) !== -1) return;
    if (_typeof(value) === 'object') clearObj(value);
    obj[key] = undefined;
    delete obj[key];
  });
};

var eitherObj = function eitherObj(obj1, obj2) {
  return isObj(obj1) && obj1 || obj2;
};

var deepFreeze = function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(function (prop) {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (_typeof(obj[prop]) === 'object' || isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};

var deepMerge = function deepMerge() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }
  return sources.reduce(function (merged, source) {
    return isArr(source)
    ? [].concat(_toConsumableArray(isArr(merged) && merged || []), _toConsumableArray(deepClone(source)))
    : isObj(source)
    ? Object.entries(source).reduce(function (joined, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
      return _objectSpread2({}, joined, _defineProperty({}, key, isColl(value) && key in joined
      ? deepMerge(joined[key], deepClone(value))
      : deepClone(value)));
    }, merged)
    : merged;
  },
  isArr(sources[0]) && [] || {});
};

var applyToCloneOf = function applyToCloneOf(obj, mutatorCb) {
  var error;
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!';
  if (!isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!';
  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!';
  if (!isFunc(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!';
  if (error) return console.warn(error) || obj;
  var clone = deepClone(obj);
  mutatorCb(clone);
  return clone;
};

var jsonEqual = function jsonEqual(one, two) {
  try {
    return JSON.stringify(one) === JSON.stringify(two);
  } catch (e) {
    return false;
  }
};

var mapObj = function mapObj(obj, cb) {
  return isObj(obj) && isFunc(cb) && Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    return cb(key, value);
  }) || obj;
};

var omitKeys = function omitKeys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return isObj(obj) && reduceObj(obj, function (key, _, updated) {
    keys.indexOf(key) === -1 && (updated[key] = obj[key]);
    return updated;
  }, {}) || {};
};

var pickKeys = function pickKeys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return isObj(obj) && keys.reduce(function (updated, key) {
    key in obj && (updated[key] = obj[key]);
    return updated;
  }, {}) || {};
};

var sanitizeCopy = function sanitizeCopy(obj) {
  return JSON.parse(sanitize(JSON.stringify(obj)));
};

var trimStringFields = function trimStringFields(object) {
  return Object.entries(object).reduce(function (cleaned, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    cleaned[key] = isStr(value) ? value.trim() : value;
    return cleaned;
  }, object);
};

var toObj = function toObj(val, divider, split) {
  if (isArr(val)) return Object.keys(val).reduce(function (obj, key) {
    obj[key] = val[key];
    return obj;
  }, {});
  if (!isStr(str)) return {};
  divider = divider || '=';
  split = split || '&';
  return str.split(split).reduce(function (obj, item) {
    var sep = item.split(divider);
    obj[sep[0].trim()] = strToType(sep[1].trim());
    return obj;
  }, {});
};

var keyMap = function keyMap(arr, toUpperCase) {
  return isArr(arr) && arr.reduce(function (obj, key) {
    if (!isStr(key)) return obj;
    var use = toUpperCase && key.toUpperCase() || key;
    obj[use] = use;
    return obj;
  }, {}) || {};
};

var everyEntry = function everyEntry(obj, predicate) {
  if (!obj) {
    console.error("everyEntry expects argument obj [".concat(obj, "] to be defined."));
    return false;
  }
  if (!isObj(obj)) {
    console.error("Argument obj ".concat(obj, " must be an object."));
    return false;
  }
  if (!isFunc(predicate)) {
    console.error("Argument 'predicate' passed into everyEntry must a function. Found: ".concat(predicate));
    return false;
  }
  return pipeline(obj, Object.entries, function (entries) {
    return entries.every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
      return predicate(key, value);
    });
  });
};

var someEntry = function someEntry(obj, predicate) {
  if (!obj) {
    console.error("someEntry expects argument obj [".concat(obj, "] to be defined."));
    return false;
  }
  if (!isObj(obj)) {
    console.error("Argument obj ".concat(obj, " must be an object."));
    return false;
  }
  if (!isFunc(predicate)) {
    console.error("Argument 'predicate' passed into someEntry must a function. Found: ".concat(predicate));
    return false;
  }
  return pipeline(obj, Object.entries, function (entries) {
    return entries.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
      return predicate(key, value);
    });
  });
};

var filterObj = function filterObj(obj, predicate) {
  if (!obj) return obj;
  if (!isObj(obj)) {
    console.error("Object ".concat(obj, " was not an object. It must be for filterObject"));
    return obj;
  }
  if (!isFunc(predicate)) {
    console.error("Argument 'predicate' passed into filterObject must a function. Found: ".concat(predicate));
    return obj;
  }
  return reduceObj(obj, function (key, value, data) {
    if (predicate(key, value)) data[key] = value;
    return data;
  }, {});
};

export { applyToCloneOf, clearObj, cloneJson, deepFreeze, deepMerge, eitherObj, everyEntry, filterObj, isEntry, jsonEqual, keyMap, mapEntries, mapKeys, mapObj, omitKeys, pickKeys, sanitizeCopy, someEntry, toObj, trimStringFields };
