'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var es_array_concat = require('./es.array.concat-207a854d.js');
var speciesConstructor = require('./species-constructor-736ba485.js');
var array = require('./array-411f3373.js');
var es_object_getPrototypeOf = require('./es.object.get-prototype-of-38cc319f.js');
var web_domCollections_iterator = require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.array.index-of-043c7818.js');
var object = require('./object-38f445e5.js');
var es_string_split = require('./es.string.split-893ff521.js');
var number = require('./number-a23c768f.js');
var string = require('./string-70ad3fa2.js');
var method = require('./method.js');
require('./web.timers-37faa3ac.js');
require('./es.object.get-own-property-names-7a04c850.js');
require('./log.js');
require('./boolean.js');
require('./ext.js');

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = es_array_concat.global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};
  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    es_array_concat.redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !es_array_concat.isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !es_array_concat.isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !es_array_concat.isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };
  if (es_array_concat.isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !es_array_concat.fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    object.InternalMetadataModule.REQUIRED = true;
  } else if (es_array_concat.isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    var THROWS_ON_PRIMITIVES = es_array_concat.fails(function () { instance.has(1); });
    var ACCEPT_ITERABLES = es_object_getPrototypeOf.checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    var BUGGY_ZERO = !IS_WEAK && es_array_concat.fails(function () {
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        es_object_getPrototypeOf.anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = number.inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) es_object_getPrototypeOf.iterate(iterable, that[ADDER], that, IS_MAP);
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
  es_array_concat.$({ global: true, forced: Constructor != NativeConstructor }, exported);
  web_domCollections_iterator.setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

var defineProperty = es_array_concat.objectDefinePropertyModule.f;
var fastKey = object.InternalMetadataModule.fastKey;
var setInternalState = es_array_concat.InternalStateModule.set;
var internalStateGetterFor = es_array_concat.InternalStateModule.getterFor;
var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      es_object_getPrototypeOf.anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: web_domCollections_iterator.create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!es_array_concat.DESCRIPTORS) that.size = 0;
      if (iterable != undefined) es_object_getPrototypeOf.iterate(iterable, that[ADDER], that, IS_MAP);
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
        if (es_array_concat.DESCRIPTORS) state.size++;
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
    es_object_getPrototypeOf.redefineAll(C.prototype, {
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
        if (es_array_concat.DESCRIPTORS) state.size = 0;
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
          if (es_array_concat.DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      forEach: function forEach(callbackfn ) {
        var state = getInternalState(this);
        var boundFunction = speciesConstructor.bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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
    es_object_getPrototypeOf.redefineAll(C.prototype, IS_MAP ? {
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
    if (es_array_concat.DESCRIPTORS) defineProperty(C.prototype, 'size', {
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
    web_domCollections_iterator.defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
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
    es_object_getPrototypeOf.setSpecies(CONSTRUCTOR_NAME);
  }
};

var es_map = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

es_array_concat.$({ target: 'Object', stat: true, sham: !es_array_concat.DESCRIPTORS }, {
  create: web_domCollections_iterator.create
});

es_array_concat.$({ target: 'Object', stat: true, sham: !es_array_concat.DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = es_array_concat.toIndexedObject(object);
    var getOwnPropertyDescriptor = es_array_concat.require$$0.f;
    var keys = es_array_concat.ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) es_array_concat.createProperty(result, key, descriptor);
    }
    return result;
  }
});

var nativeIsSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = es_array_concat.fails(function () { nativeIsSealed(1); });
es_array_concat.$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isSealed: function isSealed(it) {
    return es_array_concat.isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
  }
});

var onFreeze = object.InternalMetadataModule.onFreeze;
var nativeSeal = Object.seal;
var FAILS_ON_PRIMITIVES$1 = es_array_concat.fails(function () { nativeSeal(1); });
es_array_concat.$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !object.FREEZING }, {
  seal: function seal(it) {
    return nativeSeal && es_array_concat.isObject(it) ? nativeSeal(onFreeze(it)) : it;
  }
});

var defineProperty$1 = es_array_concat.objectDefinePropertyModule.f;
var getOwnPropertyNames = es_array_concat.require$$1.f;
var setInternalState$1 = es_array_concat.InternalStateModule.set;
var MATCH = es_array_concat.wellKnownSymbol('match');
var NativeRegExp = es_array_concat.global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var UNSUPPORTED_Y = es_string_split.require$$0.UNSUPPORTED_Y;
var FORCED = es_array_concat.DESCRIPTORS && es_array_concat.isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || es_array_concat.fails(function () {
  re2[MATCH] = false;
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = es_string_split.isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;
    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }
    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = es_string_split.regExpFlags.call(pattern);
      pattern = pattern.source;
    }
    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }
    var result = number.inheritIfRequired(
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
  es_array_concat.redefine(es_array_concat.global, 'RegExp', RegExpWrapper);
}
es_object_getPrototypeOf.setSpecies('RegExp');

var UNSUPPORTED_Y$1 = es_string_split.require$$0.UNSUPPORTED_Y;
if (es_array_concat.DESCRIPTORS && (/./g.flags != 'g' || UNSUPPORTED_Y$1)) {
  es_array_concat.objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: es_string_split.regExpFlags
  });
}

var es_set = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var getWeakData = object.InternalMetadataModule.getWeakData;
var setInternalState$2 = es_array_concat.InternalStateModule.set;
var internalStateGetterFor$1 = es_array_concat.InternalStateModule.getterFor;
var find = speciesConstructor.ArrayIterationModule.find;
var findIndex = speciesConstructor.ArrayIterationModule.findIndex;
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
      es_object_getPrototypeOf.anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) es_object_getPrototypeOf.iterate(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(es_array_concat.anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };
    es_object_getPrototypeOf.redefineAll(C.prototype, {
      'delete': function (key) {
        var state = getInternalState(this);
        if (!es_array_concat.isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && es_array_concat.$has(data, state.id) && delete data[state.id];
      },
      has: function has(key) {
        var state = getInternalState(this);
        if (!es_array_concat.isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && es_array_concat.$has(data, state.id);
      }
    });
    es_object_getPrototypeOf.redefineAll(C.prototype, IS_MAP ? {
      get: function get(key) {
        var state = getInternalState(this);
        if (es_array_concat.isObject(key)) {
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

var es_weakMap = es_array_concat.createCommonjsModule(function (module) {
var enforceIternalState = es_array_concat.InternalStateModule.enforce;
var IS_IE11 = !es_array_concat.global.ActiveXObject && 'ActiveXObject' in es_array_concat.global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;
var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);
if (es_array_concat.NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  object.InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  es_object_getPrototypeOf.redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (es_array_concat.isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (es_array_concat.isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (es_array_concat.isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (es_array_concat.isObject(key) && !isExtensible(key)) {
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
  var parts = array.isArr(path) ? Array.from(path) : path.split('.');
  var key = parts.pop();
  var prop;
  var breakPath;
  var _loop = function _loop() {
    var next = obj[prop];
    isColl(next) || method.isFunc(next) ? obj = next : function () {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = next;
    }();
    if (breakPath) return {
      v: val
    };
  };
  while (prop = parts.shift()) {
    var _ret = _loop();
    if (object._typeof(_ret) === "object") return _ret.v;
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
  return object._typeof(val) === 'object' && val !== null;
};
var isEmptyColl = function isEmptyColl(obj) {
  return array.isArr(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
};
var mapColl = function mapColl(coll, cb) {
  return method.isFunc(cb) && isColl(coll) ? Object.keys(coll).map(function (key) {
    return cb(key, coll[key], coll);
  }) : array.isArr(coll) ? [] : {};
};
var reduceColl = function reduceColl(coll, cb, reduce) {
  return method.isFunc(cb) && isColl(coll) ? Object.keys(coll).reduce(function (data, key) {
    return cb(key, coll[key], coll, data);
  }, reduce) : array.isArr(coll) ? [] : {};
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
  if (array.isArr(obj)) return obj.map(function (x) {
    return deepClone(x);
  });
  if (method.isFunc(obj)) return method.cloneFunc(obj);
  var result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null;
  if (result === null) return cloneObjWithPrototypeAndProperties(obj);
  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, function (_ref) {
    var _ref2 = object._slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];
    return result.set(key, deepClone(val, hash));
  });
  return object._extends.apply(void 0, [result].concat(object._toConsumableArray(Object.keys(obj).map(function (key) {
    return object._defineProperty({}, key, deepClone(obj[key], hash));
  }))));
};
var cloneObjWithPrototypeAndProperties = function cloneObjWithPrototypeAndProperties(objectWithPrototype) {
  if (!objectWithPrototype) return objectWithPrototype;
  var prototype = Object.getPrototypeOf(objectWithPrototype);
  var sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);
  for (var _i = 0, _Object$entries = Object.entries(sourceDescriptors); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = object._slicedToArray(_Object$entries[_i], 2),
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
  if (!number.isNum(times)) {
    console.error("Times argument must be a number");
    return [];
  }
  var arr = [];
  for (var i = 0; i < times; i++) {
    var value = method.isFunc(element) ? element() : cloneDeep ? deepClone(element) : element;
    arr.push(value);
  }
  return arr;
};
var shallowEqual = function shallowEqual(col1, col2, path) {
  if (path && (array.isArr(path) || string.isStr(path))) {
    col1 = get(col1, path);
    col2 = get(col2, path);
  }
  if (col1 === col2) return true;
  if (object._typeof(col1) !== "object" || !col1 || object._typeof(col2) !== "object" || !col2) return false;
  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
  for (var key in col1) {
    if (col1[key] !== col2[key]) return false;
  }
  return true;
};

exports.deepClone = deepClone;
exports.get = get;
exports.isColl = isColl;
exports.isEmptyColl = isEmptyColl;
exports.mapColl = mapColl;
exports.reduceColl = reduceColl;
exports.repeat = repeat;
exports.set = set;
exports.shallowEqual = shallowEqual;
exports.unset = unset;
