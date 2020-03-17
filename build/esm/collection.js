import { G as global, S as isForced, g as fails, $, l as redefine, A as isObject, D as DESCRIPTORS, o as objectDefinePropertyModule, B as InternalStateModule, C as toIndexedObject, V as ownKeys, j as createProperty, K as require$$0, w as wellKnownSymbol, E as require$$1, u as $has, d as anObject, k as createCommonjsModule, W as NATIVE_WEAK_MAP } from './es.array.concat-2cad827a.js';
import { b as bind, A as ArrayIterationModule } from './species-constructor-e56845e3.js';
import { i as isArr } from './array-ee263a8a.js';
import { c as checkCorrectnessOfIteration, a as anInstance, i as iterate, r as redefineAll, s as setSpecies } from './es.object.get-prototype-of-95b6b85b.js';
import { d as setToStringTag, b as create, e as defineIterator } from './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import { I as InternalMetadataModule, F as FREEZING, B as _typeof, _ as _slicedToArray, D as _extends, c as _toConsumableArray, b as _defineProperty } from './object-f4dd8b1b.js';
import { b as require$$0$1, i as isRegExp, r as regExpFlags } from './es.string.split-3996f72b.js';
import { h as inheritIfRequired, a as isNum } from './number-115728d2.js';
import { i as isStr } from './string-0069576a.js';
import { isFunc, cloneFunc } from './method.js';
import './web.timers-4a3cb5af.js';
import './es.object.get-own-property-names-e3b24cf9.js';
import './log.js';
import './boolean.js';
import './ext.js';

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};
  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }
  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);
  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

var defineProperty = objectDefinePropertyModule.f;
var fastKey = InternalMetadataModule.fastKey;
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      if (entry) {
        entry.value = value;
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };
    var getEntry = function (that, key) {
      var state = getInternalState(that);
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };
    redefineAll(C.prototype, {
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      forEach: function forEach(callbackfn ) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      while (entry && entry.removed) entry = entry.previous;
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
    setSpecies(CONSTRUCTOR_NAME);
  }
};

var es_map = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = require$$0.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

var nativeIsSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsSealed(1); });
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isSealed: function isSealed(it) {
    return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
  }
});

var onFreeze = InternalMetadataModule.onFreeze;
var nativeSeal = Object.seal;
var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeSeal(1); });
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !FREEZING }, {
  seal: function seal(it) {
    return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it;
  }
});

var defineProperty$1 = objectDefinePropertyModule.f;
var getOwnPropertyNames = require$$1.f;
var setInternalState$1 = InternalStateModule.set;
var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var UNSUPPORTED_Y = require$$0$1.UNSUPPORTED_Y;
var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;
    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }
    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = regExpFlags.call(pattern);
      pattern = pattern.source;
    }
    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }
    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );
    if (UNSUPPORTED_Y && sticky) setInternalState$1(result, { sticky: sticky });
    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}
setSpecies('RegExp');

var UNSUPPORTED_Y$1 = require$$0$1.UNSUPPORTED_Y;
if (DESCRIPTORS && (/./g.flags != 'g' || UNSUPPORTED_Y$1)) {
  objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlags
  });
}

var es_set = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var getWeakData = InternalMetadataModule.getWeakData;
var setInternalState$2 = InternalStateModule.set;
var internalStateGetterFor$1 = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.entries = [];
};
var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};
var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };
    redefineAll(C.prototype, {
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      add: function add(value) {
        return define(this, value, true);
      }
    });
    return C;
  }
};

var es_weakMap = createCommonjsModule(function (module) {
var enforceIternalState = InternalStateModule.enforce;
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;
var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}
});

var updateColl = function updateColl(obj, path, type, val) {
  var org = obj;
  if (!isColl(obj) || !obj || !path) return type !== 'set' && val || undefined;
  var parts = isArr(path) ? Array.from(path) : path.split('.');
  var key = parts.pop();
  var prop;
  var breakPath;
  var _loop = function _loop() {
    var next = obj[prop];
    isColl(next) || isFunc(next) ? obj = next : function () {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = next;
    }();
    if (breakPath) return {
      v: val
    };
  };
  while (prop = parts.shift()) {
    var _ret = _loop();
    if (_typeof(_ret) === "object") return _ret.v;
  }
  return type === 'get'
  ? key in obj ? obj[key] : val : type === 'unset'
  ? delete obj[key] :
  (obj[key] = val) && org || org;
};
var get = function get(obj, path, fallback) {
  return updateColl(obj, path, 'get', fallback);
};
var isColl = function isColl(val) {
  return _typeof(val) === 'object' && val !== null;
};
var isEmptyColl = function isEmptyColl(obj) {
  return isArr(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
};
var mapColl = function mapColl(coll, cb) {
  return isFunc(cb) && isColl(coll) ? Object.keys(coll).map(function (key) {
    return cb(key, coll[key], coll);
  }) : isArr(coll) ? [] : {};
};
var reduceColl = function reduceColl(coll, cb, reduce) {
  return isFunc(cb) && isColl(coll) ? Object.keys(coll).reduce(function (data, key) {
    return cb(key, coll[key], coll, data);
  }, reduce) : isArr(coll) ? [] : {};
};
var set = function set(obj, path, val) {
  return updateColl(obj, path, 'set', val);
};
var unset = function unset(obj, path) {
  return updateColl(obj, path, 'unset');
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
  return _extends.apply(void 0, [result].concat(_toConsumableArray(Object.keys(obj).map(function (key) {
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
var repeat = function repeat(element, times) {
  var cloneDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!times || times <= 0) return [];
  if (!isNum(times)) {
    console.error("Times argument must be a number");
    return [];
  }
  var arr = [];
  for (var i = 0; i < times; i++) {
    var value = isFunc(element) ? element() : cloneDeep ? deepClone(element) : element;
    arr.push(value);
  }
  return arr;
};
var shallowEqual = function shallowEqual(col1, col2, path) {
  if (path && (isArr(path) || isStr(path))) {
    col1 = get(col1, path);
    col2 = get(col2, path);
  }
  if (col1 === col2) return true;
  if (_typeof(col1) !== "object" || !col1 || _typeof(col2) !== "object" || !col2) return false;
  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
  for (var key in col1) {
    if (col1[key] !== col2[key]) return false;
  }
  return true;
};

export { deepClone, get, isColl, isEmptyColl, mapColl, reduceColl, repeat, set, shallowEqual, unset };
