import { $, O as isArray, C as toIndexedObject, D as DESCRIPTORS, P as propertyIsEnumerableModule, g as fails, t as toObject, h as arrayMethodIsStrict, f as arrayMethodUsesToLength, k as createCommonjsModule, J as uid, A as isObject, u as $has, x as hiddenKeys, o as objectDefinePropertyModule } from './es.array.concat-2cad827a.js';
import { A as ArrayIterationModule } from './species-constructor-e56845e3.js';
import { i as isArr } from './array-ee263a8a.js';
import { a as nativeKeys } from './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import './es.string.split-3996f72b.js';
import { a as isNum } from './number-115728d2.js';
import { i as isStr, s as sanitize } from './string-0069576a.js';
import { isFunc, pipeline } from './method.js';
import './es.object.get-own-property-names-e3b24cf9.js';
import { logData } from './log.js';
import { deepClone, isColl, set } from './collection.js';
import { strToType } from './ext.js';

$({ target: 'Array', stat: true }, {
  isArray: isArray
});

var propertyIsEnumerable = propertyIsEnumerableModule.f;
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = nativeKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};
var objectToArray = {
  entries: createMethod(true),
  values: createMethod(false)
};

var $entries = objectToArray.entries;
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

var $every = ArrayIterationModule.every;
var STRICT_METHOD = arrayMethodIsStrict('every');
var USES_TO_LENGTH = arrayMethodUsesToLength('every');
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: function every(callbackfn ) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefinePropertyModule.f;
var METADATA = uid('meta');
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id,
    weakData: {}
  } });
};
var fastKey = function (it, create) {
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!$has(it, METADATA)) {
    if (!isExtensible(it)) return 'F';
    if (!create) return 'E';
    setMetadata(it);
  } return it[METADATA].objectID;
};
var getWeakData = function (it, create) {
  if (!$has(it, METADATA)) {
    if (!isExtensible(it)) return true;
    if (!create) return false;
    setMetadata(it);
  } return it[METADATA].weakData;
};
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !$has(it, METADATA)) setMetadata(it);
  return it;
};
var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};
hiddenKeys[METADATA] = true;
});
var internalMetadata_1 = internalMetadata.REQUIRED;
var internalMetadata_2 = internalMetadata.fastKey;
var internalMetadata_3 = internalMetadata.getWeakData;
var internalMetadata_4 = internalMetadata.onFreeze;

var onFreeze = internalMetadata.onFreeze;
var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeFreeze(1); });
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !freezing }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});

var nativeIsFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeIsFrozen(1); });
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
  isFrozen: function isFrozen(it) {
    return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
  }
});

var cloneJson = function cloneJson(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    logData(e.message, 'error');
    return null;
  }
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
    ? Object.entries(source).reduce(function (joined, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
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
var hasOwn = function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
var isObj = function isObj(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
};
var jsonEqual = function jsonEqual(one, two) {
  try {
    return JSON.stringify(one) === JSON.stringify(two);
  } catch (e) {
    return false;
  }
};
var mapObj = function mapObj(obj, cb) {
  return isObj(obj) && isFunc(cb) && Object.entries(obj).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];
    return cb(key, value);
  }) || obj;
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
  return entries.reduce(function (obj, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];
    var result = cb(key, value);
    if (!isEntry(result)) {
      console.error("Callback function must return entry. Found: ".concat(result, ". Using current entry instead."));
      return set(obj, key, value);
    }
    return set(obj, result[0], result[1]);
  }, initialValue);
};
var isEntry = function isEntry(maybeEntry) {
  return isArr(maybeEntry) && maybeEntry.length === 2 && (isNum(maybeEntry[0]) || isStr(maybeEntry[0]));
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
var reduceObj = function reduceObj(obj, cb) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return isObj(obj) && isFunc(cb) && Object.entries(obj).reduce(function (data, _ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        key = _ref10[0],
        value = _ref10[1];
    return cb(key, value, data);
  }, start) || start;
};
var sanitizeCopy = function sanitizeCopy(obj) {
  return JSON.parse(sanitize(JSON.stringify(obj)));
};
var trimStringFields = function trimStringFields(object) {
  return Object.entries(object).reduce(function (cleaned, _ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        key = _ref12[0],
        value = _ref12[1];
    cleaned[key] = typeof value === 'string' ? value.trim() : value;
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
    return entries.every(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          key = _ref14[0],
          value = _ref14[1];
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
    return entries.some(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
          key = _ref16[0],
          value = _ref16[1];
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

export { _toArray as A, _typeof as B, _construct as C, _extends as D, freezing as F, internalMetadata as I, _slicedToArray as _, _objectSpread2 as a, _defineProperty as b, _toConsumableArray as c, cloneJson as d, clearObj as e, eitherObj as f, deepFreeze as g, deepMerge as h, isObj as i, applyToCloneOf as j, hasOwn as k, jsonEqual as l, mapKeys as m, mapObj as n, mapEntries as o, isEntry as p, omitKeys as q, pickKeys as r, reduceObj as s, sanitizeCopy as t, trimStringFields as u, toObj as v, keyMap as w, everyEntry as x, someEntry as y, filterObj as z };
