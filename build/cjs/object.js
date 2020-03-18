'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');
var isObj = require('./isObj-ffedee44.js');
var isNum = require('./isNum-e8ce2740.js');
require('./isBool-102c91d0.js');
require('./toBool-5478ef10.js');
var isStr = require('./isStr-1e4ba1f4.js');
require('./toStr-ad9e855c.js');
var isColl = require('./isColl-28b48873.js');
require('./updateColl-5bfa896d.js');
var deepClone = require('./deepClone-75d63e18.js');
require('./cloneFunc-d8134d8a.js');
require('./toNum-52f991fa.js');
var strToType = require('./strToType-c04fb9b0.js');
var log = require('./log.js');
var hasOwn = require('./hasOwn-ef95a3fb.js');
var reduceObj = require('./reduceObj-e1d83176.js');
var sanitize = require('./sanitize-2fbdaf02.js');

var cloneJson = function cloneJson(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    log.logData(e.message, 'error');
    return null;
  }
};

var isEntry = function isEntry(maybeEntry) {
  return isArr.isArr(maybeEntry) && maybeEntry.length === 2 && (isNum.isNum(maybeEntry[0]) || isStr.isStr(maybeEntry[0]));
};

var mapEntries = function mapEntries(obj, cb) {
  if (!isArr.isArr(obj) && !isObj.isObj(obj)) {
    console.error(obj, "Expected array or object for obj. Found ".concat(isFunc._typeof(obj)));
    return obj;
  }
  if (!isFunc.isFunc(cb)) {
    console.error("Expected function for cb. Found ".concat(isFunc._typeof(cb)));
    return obj;
  }
  var entries = Object.entries(obj);
  var initialValue = isArr.isArr(obj) ? [] : {};
  return entries.reduce(function (obj, _ref) {
    var _ref2 = isFunc._slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    var result = cb(key, value);
    if (!isEntry(result)) {
      console.error("Callback function must return entry. Found: ".concat(result, ". Using current entry instead."));
      return deepClone.set(obj, key, value);
    }
    return deepClone.set(obj, result[0], result[1]);
  }, initialValue);
};

var mapKeys = function mapKeys(obj, keyMapper) {
  if (!isObj.isObj(obj) || !isFunc.isFunc(keyMapper)) return obj;
  return mapEntries(obj, function (key, value) {
    return [keyMapper(key), value];
  });
};

var clearObj = function clearObj(obj, filter) {
  obj && Object.entries(obj).map(function (_ref) {
    var _ref2 = isFunc._slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    if (filter && filter.indexOf(key) !== -1) return;
    if (isFunc._typeof(value) === 'object') clearObj(value);
    obj[key] = undefined;
    delete obj[key];
  });
};

var eitherObj = function eitherObj(obj1, obj2) {
  return isObj.isObj(obj1) && obj1 || obj2;
};

var deepFreeze = function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(function (prop) {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (isFunc._typeof(obj[prop]) === 'object' || isFunc.isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};

var deepMerge = function deepMerge() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }
  return sources.reduce(function (merged, source) {
    return isArr.isArr(source)
    ? [].concat(isFunc._toConsumableArray(isArr.isArr(merged) && merged || []), isFunc._toConsumableArray(deepClone.deepClone(source)))
    : isObj.isObj(source)
    ? Object.entries(source).reduce(function (joined, _ref) {
      var _ref2 = isFunc._slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
      return isFunc._objectSpread2({}, joined, isFunc._defineProperty({}, key, isColl.isColl(value) && key in joined
      ? deepMerge(joined[key], deepClone.deepClone(value))
      : deepClone.deepClone(value)));
    }, merged)
    : merged;
  },
  isArr.isArr(sources[0]) && [] || {});
};

var applyToCloneOf = function applyToCloneOf(obj, mutatorCb) {
  var error;
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!';
  if (!isObj.isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!';
  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!';
  if (!isFunc.isFunc(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!';
  if (error) return console.warn(error) || obj;
  var clone = deepClone.deepClone(obj);
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
  return isObj.isObj(obj) && isFunc.isFunc(cb) && Object.entries(obj).map(function (_ref) {
    var _ref2 = isFunc._slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    return cb(key, value);
  }) || obj;
};

var omitKeys = function omitKeys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return isObj.isObj(obj) && reduceObj.reduceObj(obj, function (key, _, updated) {
    keys.indexOf(key) === -1 && (updated[key] = obj[key]);
    return updated;
  }, {}) || {};
};

var pickKeys = function pickKeys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return isObj.isObj(obj) && keys.reduce(function (updated, key) {
    key in obj && (updated[key] = obj[key]);
    return updated;
  }, {}) || {};
};

var sanitizeCopy = function sanitizeCopy(obj) {
  return JSON.parse(sanitize.sanitize(JSON.stringify(obj)));
};

var trimStringFields = function trimStringFields(object) {
  return Object.entries(object).reduce(function (cleaned, _ref) {
    var _ref2 = isFunc._slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    cleaned[key] = isStr.isStr(value) ? value.trim() : value;
    return cleaned;
  }, object);
};

var toObj = function toObj(val, divider, split) {
  if (isArr.isArr(val)) return Object.keys(val).reduce(function (obj, key) {
    obj[key] = val[key];
    return obj;
  }, {});
  if (!isStr.isStr(str)) return {};
  divider = divider || '=';
  split = split || '&';
  return str.split(split).reduce(function (obj, item) {
    var sep = item.split(divider);
    obj[sep[0].trim()] = strToType.strToType(sep[1].trim());
    return obj;
  }, {});
};

var keyMap = function keyMap(arr, toUpperCase) {
  return isArr.isArr(arr) && arr.reduce(function (obj, key) {
    if (!isStr.isStr(key)) return obj;
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
  if (!isObj.isObj(obj)) {
    console.error("Argument obj ".concat(obj, " must be an object."));
    return false;
  }
  if (!isFunc.isFunc(predicate)) {
    console.error("Argument 'predicate' passed into everyEntry must a function. Found: ".concat(predicate));
    return false;
  }
  return hasOwn.pipeline(obj, Object.entries, function (entries) {
    return entries.every(function (_ref) {
      var _ref2 = isFunc._slicedToArray(_ref, 2),
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
  if (!isObj.isObj(obj)) {
    console.error("Argument obj ".concat(obj, " must be an object."));
    return false;
  }
  if (!isFunc.isFunc(predicate)) {
    console.error("Argument 'predicate' passed into someEntry must a function. Found: ".concat(predicate));
    return false;
  }
  return hasOwn.pipeline(obj, Object.entries, function (entries) {
    return entries.some(function (_ref) {
      var _ref2 = isFunc._slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
      return predicate(key, value);
    });
  });
};

var filterObj = function filterObj(obj, predicate) {
  if (!obj) return obj;
  if (!isObj.isObj(obj)) {
    console.error("Object ".concat(obj, " was not an object. It must be for filterObject"));
    return obj;
  }
  if (!isFunc.isFunc(predicate)) {
    console.error("Argument 'predicate' passed into filterObject must a function. Found: ".concat(predicate));
    return obj;
  }
  return reduceObj.reduceObj(obj, function (key, value, data) {
    if (predicate(key, value)) data[key] = value;
    return data;
  }, {});
};

exports.isObj = isObj.isObj;
exports.hasOwn = hasOwn.hasOwn;
exports.reduceObj = reduceObj.reduceObj;
exports.applyToCloneOf = applyToCloneOf;
exports.clearObj = clearObj;
exports.cloneJson = cloneJson;
exports.deepFreeze = deepFreeze;
exports.deepMerge = deepMerge;
exports.eitherObj = eitherObj;
exports.everyEntry = everyEntry;
exports.filterObj = filterObj;
exports.isEntry = isEntry;
exports.jsonEqual = jsonEqual;
exports.keyMap = keyMap;
exports.mapEntries = mapEntries;
exports.mapKeys = mapKeys;
exports.mapObj = mapObj;
exports.omitKeys = omitKeys;
exports.pickKeys = pickKeys;
exports.sanitizeCopy = sanitizeCopy;
exports.someEntry = someEntry;
exports.toObj = toObj;
exports.trimStringFields = trimStringFields;
