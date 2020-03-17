(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.jsutils = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};
	var global_1 =
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;
	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;
	var indexedObject = fails(function () {
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);
	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString;
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}
	var inspectSource = sharedStore.inspectSource;

	var WeakMap$1 = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.4',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();
	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');
	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$2 = global_1.WeakMap;
	var set, get, has$1;
	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};
	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};
	if (nativeWeakMap) {
	  var store$1 = new WeakMap$2();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}
	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');
	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};
	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
	};

	var max = Math.max;
	var min$1 = Math.min;
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};
	var arrayIncludes = {
	  includes: createMethod(true),
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;
	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};
	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;
	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};
	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};
	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function () {
	    return fn.apply(that, arguments);
	  };
	};

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;
	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result;
	        else if (result) switch (TYPE) {
	          case 3: return true;
	          case 5: return value;
	          case 6: return index;
	          case 2: push.call(target, value);
	        } else if (IS_EVERY) return false;
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};
	var arrayIteration = {
	  forEach: createMethod$1(0),
	  map: createMethod$1(1),
	  filter: createMethod$1(2),
	  some: createMethod$1(3),
	  every: createMethod$1(4),
	  find: createMethod$1(5),
	  findIndex: createMethod$1(6)
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;
	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}
	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');
	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};
	var thrower = function (it) { throw it; };
	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };
	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $filter = arrayIteration.filter;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	var USES_TO_LENGTH = arrayMethodUsesToLength('filter');
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {  }
	};
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');
	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var arrayFrom = function from(arrayLike ) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;
	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  };
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) {  }
	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) {  }
	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});
	_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: arrayFrom
	});

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$1 }, {
	  indexOf: function indexOf(searchElement ) {
	    return NEGATIVE_ZERO
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_export({ target: 'Array', stat: true }, {
	  isArray: isArray
	});

	var $map = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('map');
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
	  map: function map(callbackfn ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};
	var arrayReduce = {
	  left: createMethod$2(false),
	  right: createMethod$2(true)
	};

	var $reduce = arrayReduce.left;
	var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('reduce', { 1: 0 });
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$3 }, {
	  reduce: function reduce(callbackfn ) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var test$1 = [];
	var nativeSort = test$1.sort;
	var FAILS_ON_UNDEFINED = fails(function () {
	  test$1.sort(undefined);
	});
	var FAILS_ON_NULL = fails(function () {
	  test$1.sort(null);
	});
	var STRICT_METHOD$2 = arrayMethodIsStrict('sort');
	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$2;
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject(this))
	      : nativeSort.call(toObject(this), aFunction$1(comparefn));
	  }
	});

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });
	var max$1 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4 }, {
	  splice: function splice(start, deleteCount ) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$1(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	var createMethod$3 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};
	var objectToArray = {
	  entries: createMethod$3(true),
	  values: createMethod$3(false)
	};

	var $entries = objectToArray.entries;
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};
	var stringMultibyte = {
	  codeAt: createMethod$4(false),
	  charAt: createMethod$4(true)
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() {  }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;
	var returnThis = function () { return this; };
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
	if ([].keys) {
	  arrayIterator = [].keys();
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}
	if (IteratorPrototype == undefined) IteratorPrototype = {};
	if ( !has(IteratorPrototype, ITERATOR$3)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
	}
	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var EmptyConstructor = function () {  };
	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null;
	  return temp;
	};
	var NullProtoObjectViaIFrame = function () {
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {  }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};
	hiddenKeys[IE_PROTO$1] = true;
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var defineProperty$1 = objectDefineProperty.f;
	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty$1(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var returnThis$1 = function () { return this; };
	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {  }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';
	var returnThis$2 = function () { return this; };
	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);
	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };
	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      }
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }
	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }
	  return methods;
	};

	var charAt = stringMultibyte.charAt;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(STRING_ITERATOR);
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
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

	function ownKeys$1(object, enumerableOnly) {
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
	      ownKeys$1(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(Object(source)).forEach(function (key) {
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

	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    objectSetPrototypeOf &&
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');
	var createMethod$5 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};
	var stringTrim = {
	  start: createMethod$5(1),
	  end: createMethod$5(2),
	  trim: createMethod$5(3)
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$2 = objectDefineProperty.f;
	var trim = stringTrim.trim;
	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN;
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break;
	        case 79: case 111: radix = 8; maxCode = 55; break;
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	var trim$1 = stringTrim.trim;
	var $parseFloat = global_1.parseFloat;
	var FORCED$1 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;
	var numberParseFloat = FORCED$1 ? function parseFloat(string) {
	  var trimmedString = trim$1(String(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	_export({ global: true, forced: parseFloat != numberParseFloat }, {
	  parseFloat: numberParseFloat
	});

	var trim$2 = stringTrim.trim;
	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$2 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;
	var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
	  var S = trim$2(String(string));
	  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	_export({ global: true, forced: parseInt != numberParseInt }, {
	  parseInt: numberParseInt
	});

	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	function RE(s, f) {
	  return RegExp(s, f);
	}
	var UNSUPPORTED_Y = fails(function () {
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	var BROKEN_CARET = fails(function () {
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;
	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();
	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;
	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;
	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }
	      strCopy = String(str).slice(re.lastIndex);
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }
	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
	    match = nativeExec.call(sticky ? reCopy : re, strCopy);
	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }
	    return match;
	  };
	}
	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var SPECIES$2 = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();
	var REPLACE = wellKnownSymbol('replace');
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});
	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    var execCalled = false;
	    var re = /a/;
	    if (KEY === 'split') {
	      re = {};
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }
	    re.exec = function () { execCalled = true; return null; };
	    re[SYMBOL]('');
	    return !execCalled;
	  });
	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }
	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return regexpExec.call(R, S);
	};

	var max$2 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }
	      var rx = anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$2(min$3(toInteger(result.index), S.length), 0);
	        var captures = [];
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default:
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};
	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var f$6 = wellKnownSymbol;
	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty$3 = objectDefineProperty.f;
	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var $forEach = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;
	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState$1(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};
	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};
	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};
	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};
	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };
	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$1(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });
	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;
	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	  if (descriptors) {
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$1(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}
	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});
	$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});
	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});
	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  create: $create,
	  defineProperty: $defineProperty,
	  defineProperties: $defineProperties,
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  getOwnPropertyNames: $getOwnPropertyNames,
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    return $stringify([symbol]) != '[null]'
	      || $stringify({ a: symbol }) != '{}'
	      || $stringify(Object(symbol)) != '{}';
	  });
	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return;
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	var defineProperty$4 = objectDefineProperty.f;
	var NativeSymbol = global_1.Symbol;
	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;
	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$4(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });
	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	defineWellKnownSymbol('iterator');

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');
	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};
	var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
	_export({ target: 'Array', proto: true, forced: FORCED$3 }, {
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype;
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}
	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$2(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    index: 0,
	    kind: kind
	  });
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');
	iterators.Arguments = iterators.Array;
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var nativeJoin = [].join;
	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$3 = arrayMethodIsStrict('join', ',');
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$3 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });
	var SPECIES$3 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$3 = Math.max;
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$5 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$3];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$3(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var $some = arrayIteration.some;
	var STRICT_METHOD$4 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('some');
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$6 }, {
	  some: function some(callbackfn ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	var MATCH = wellKnownSymbol('match');
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var SPECIES$4 = wellKnownSymbol('species');
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++;
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;
	  return [
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;
	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);
	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;
	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING];
	var getTime = DatePrototype.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine(DatePrototype, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	var defineProperty$5 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$5(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperty: objectDefineProperty.f
	});

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var TO_STRING$1 = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING$1];
	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	var INCORRECT_NAME = nativeToString.name != TO_STRING$1;
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING$1, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var slice = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent);
	var wrap$1 = function (scheduler) {
	  return function (handler, timeout ) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	};
	_export({ global: true, bind: true, forced: MSIE }, {
	  setTimeout: wrap$1(global_1.setTimeout),
	  setInterval: wrap$1(global_1.setInterval)
	});

	var $every = arrayIteration.every;
	var STRICT_METHOD$5 = arrayMethodIsStrict('every');
	var USES_TO_LENGTH$7 = arrayMethodUsesToLength('every');
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$5 || !USES_TO_LENGTH$7 }, {
	  every: function every(callbackfn ) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;
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
	  if (!has(it, METADATA)) {
	    if (!isExtensible(it)) return 'F';
	    if (!create) return 'E';
	    setMetadata(it);
	  } return it[METADATA].objectID;
	};
	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    if (!isExtensible(it)) return true;
	    if (!create) return false;
	    setMetadata(it);
	  } return it[METADATA].weakData;
	};
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
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
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !freezing }, {
	  freeze: function freeze(it) {
	    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
	  }
	});

	var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
	var FAILS_ON_PRIMITIVES$2 = fails(function () { return !Object.getOwnPropertyNames(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
	  getOwnPropertyNames: nativeGetOwnPropertyNames$2
	});

	var nativeIsFrozen = Object.isFrozen;
	var FAILS_ON_PRIMITIVES$3 = fails(function () { nativeIsFrozen(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3 }, {
	  isFrozen: function isFrozen(it) {
	    return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
	  }
	});

	var non = '\u200B\u0085\u180E';
	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;
	_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var SHOW_LOGS;
	var METH_DEF = 'dir';
	var PREFIX = 'type';
	var LOG_TYPES = ['error', 'info', 'log', 'dir', 'warn'];
	var setLogs = function setLogs(log, methDef, prefix) {
	  SHOW_LOGS = log;
	  METH_DEF = methDef || METH_DEF || 'log';
	  PREFIX = prefix || PREFIX || 'type';
	};
	var resetLogs = function resetLogs() {
	  SHOW_LOGS = undefined;
	  METH_DEF = 'log';
	  PREFIX = 'type';
	};
	var logData = function logData() {
	  var _console, _console2;
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  if (!args.length) return;
	  var type = args.length === 1 ? METH_DEF : args.pop();
	  if (!SHOW_LOGS && type !== 'error') return;else if (typeof args[0] === 'string') {
	    if (PREFIX === 'type') args[0] = "[ ".concat(type.toUpperCase(), " ] ").concat(args[0]);else if (PREFIX) args[0] = "".concat(PREFIX, " ").concat(args[0]);
	  }
	  LOG_TYPES.indexOf(type) !== -1 ? (_console = console)[type].apply(_console, args) : (_console2 = console)[METH_DEF].apply(_console2, args.concat([type]));
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};
	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;
	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }
	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};
	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
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
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
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
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
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
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);
	  setToStringTag(Constructor, CONSTRUCTOR_NAME);
	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$5 = wellKnownSymbol('species');
	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;
	  if (descriptors && Constructor && !Constructor[SPECIES$5]) {
	    defineProperty(Constructor, SPECIES$5, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$6 = objectDefineProperty.f;
	var fastKey = internalMetadata.fastKey;
	var setInternalState$3 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;
	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$3(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
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
	        if (descriptors) state.size++;
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
	        if (descriptors) state.size = 0;
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
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      forEach: function forEach(callbackfn ) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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
	    if (descriptors) defineProperty$6(C.prototype, 'size', {
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
	      setInternalState$3(this, {
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

	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  create: objectCreate
	});

	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
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

	var FAILS_ON_PRIMITIVES$4 = fails(function () { objectGetPrototypeOf(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$4, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var nativeIsSealed = Object.isSealed;
	var FAILS_ON_PRIMITIVES$5 = fails(function () { nativeIsSealed(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$5 }, {
	  isSealed: function isSealed(it) {
	    return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
	  }
	});

	var onFreeze$1 = internalMetadata.onFreeze;
	var nativeSeal = Object.seal;
	var FAILS_ON_PRIMITIVES$6 = fails(function () { nativeSeal(1); });
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$6, sham: !freezing }, {
	  seal: function seal(it) {
	    return nativeSeal && isObject(it) ? nativeSeal(onFreeze$1(it)) : it;
	  }
	});

	var defineProperty$7 = objectDefineProperty.f;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var setInternalState$4 = internalState.set;
	var MATCH$1 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;
	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;
	var FORCED$4 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$2 || fails(function () {
	  re2[MATCH$1] = false;
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));
	if (FORCED$4) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;
	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }
	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }
	    if (UNSUPPORTED_Y$2) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }
	    var result = inheritIfRequired(
	      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
	      thisIsRegExp ? this : RegExpPrototype$1,
	      RegExpWrapper
	    );
	    if (UNSUPPORTED_Y$2 && sticky) setInternalState$4(result, { sticky: sticky });
	    return result;
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$7(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys$2 = getOwnPropertyNames$1(NativeRegExp);
	  var index = 0;
	  while (keys$2.length > index) proxy(keys$2[index++]);
	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	}
	setSpecies('RegExp');

	var UNSUPPORTED_Y$3 = regexpStickyHelpers.UNSUPPORTED_Y;
	if (descriptors && (/./g.flags != 'g' || UNSUPPORTED_Y$3)) {
	  objectDefineProperty.f(RegExp.prototype, 'flags', {
	    configurable: true,
	    get: regexpFlags
	  });
	}

	var es_set = collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var getWeakData = internalMetadata.getWeakData;
	var setInternalState$5 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;
	var find = arrayIteration.find;
	var findIndex = arrayIteration.findIndex;
	var id$1 = 0;
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
	      setInternalState$5(that, {
	        type: CONSTRUCTOR_NAME,
	        id: id$1++,
	        frozen: undefined
	      });
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
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
	        return data && has(data, state.id) && delete data[state.id];
	      },
	      has: function has$1(key) {
	        var state = getInternalState(this);
	        if (!isObject(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state).has(key);
	        return data && has(data, state.id);
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
	var enforceIternalState = internalState.enforce;
	var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
	var isExtensible = Object.isExtensible;
	var InternalWeakMap;
	var wrapper = function (init) {
	  return function WeakMap() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	};
	var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);
	if (nativeWeakMap && IS_IE11) {
	  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
	  internalMetadata.REQUIRED = true;
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
	var get$1 = function get(obj, path, fallback) {
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
	var set$1 = function set(obj, path, val) {
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
	    col1 = get$1(col1, path);
	    col2 = get$1(col2, path);
	  }
	  if (col1 === col2) return true;
	  if (_typeof(col1) !== "object" || !col1 || _typeof(col2) !== "object" || !col2) return false;
	  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
	  for (var key in col1) {
	    if (col1[key] !== col2[key]) return false;
	  }
	  return true;
	};

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

	var either = function either(val1, val2, check) {
	  return !isFunc(check) ? softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
	};
	var typeOf = function typeOf(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	};
	var isSame = function isSame(val1, val2) {
	  return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
	};
	var isEmpty = function isEmpty(val) {
	  return isObj(val) ? Object.keys(val).length === 0 : isArr(val) ? val.length === 0 : isStr(val) ? val.trim().length === 0 : isNum(val) ? val < 1 : false;
	};
	var isValidDate = function isValidDate(date) {
	  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
	};
	var strToType = function strToType(val) {
	  return !val || !isStr(val) ? val : isStrBool(val) ? toBool(val) : isNum(val) ? toNum(val) : function () {
	    try {
	      return JSON.parse(val);
	    } catch (e) {
	      return val;
	    }
	  }();
	};

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
	      return set$1(obj, key, value);
	    }
	    return set$1(obj, result[0], result[1]);
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

	var pipeline = function pipeline(item) {
	  for (var _len = arguments.length, functions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    functions[_key - 1] = arguments[_key];
	  }
	  return functions.reduce(function (result, fn) {
	    return applyToFunc(result, fn);
	  }, item);
	};
	var applyToFunc = function applyToFunc(item, expression) {
	  if (isArr(expression)) {
	    var _expression = _toArray(expression),
	        func = _expression[0],
	        args = _expression.slice(1);
	    return func.apply(void 0, [item].concat(_toConsumableArray(args)));
	  } else if (isFunc(expression)) {
	    return expression(item);
	  } else {
	    console.error("Pipeline expected either a function or an array (for function expressions). Found ".concat(_typeof(expression)));
	    return item;
	  }
	};
	var checkCall = function checkCall(method) {
	  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    params[_key2 - 1] = arguments[_key2];
	  }
	  return isFunc(method) && method.apply(void 0, params) || undefined;
	};
	var eitherFunc = function eitherFunc(func1, func2) {
	  return isFunc(func1) && func1 || func2;
	};
	var debounce = function debounce(func) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
	  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var timeout;
	  function wrapFunc() {
	    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }
	    if (!isFunc(func)) return null;
	    var context = this;
	    var later = function later() {
	      timeout = null;
	      !immediate && func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) return isFunc(func) && func.apply(context, args);
	  }
	  return wrapFunc;
	};
	var doIt = function doIt() {
	  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    args[_key4] = arguments[_key4];
	  }
	  var params = args.slice();
	  var num = params.shift();
	  var bindTo = params.shift();
	  var cb = params.pop();
	  if (!isNum(num) || !isFunc(cb)) return [];
	  var doItAmount = new Array(num);
	  var responses = [];
	  for (var i = 0; i < doItAmount.length; i++) {
	    var data = cb.call.apply(cb, [bindTo, i].concat(_toConsumableArray(params)));
	    if (data === false) break;
	    responses.push(data);
	  }
	  return responses;
	};
	var isFunc = function isFunc(func) {
	  return typeof func === 'function';
	};
	var memorize = function memorize(func, getCacheKey) {
	  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);
	  var _memorized = function memorized() {
	    var cache = _memorized.cache;
	    var key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
	    if (hasOwn(cache, key)) return cache[key];
	    var result = func.apply(this, arguments);
	    isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : _memorized.cache = _defineProperty({}, key, result);
	    return result;
	  };
	  _memorized.cache = {};
	  _memorized.destroy = function () {
	    getCacheKey = undefined;
	    _memorized.cache = undefined;
	    _memorized.destroy = undefined;
	    _memorized = undefined;
	  };
	  return _memorized;
	};
	var throttle = function throttle(func) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	  var waiting = false;
	  return function () {
	    if (waiting) return;
	    waiting = true;
	    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }
	    func.apply(this, args);
	    return setTimeout(function () {
	      waiting = false;
	    }, wait);
	  };
	};
	var throttleLast = function throttleLast(func, cb) {
	  var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	  var throttleTimeout;
	  return function () {
	    var _this = this;
	    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }
	    if (throttleTimeout) clearTimeout(throttleTimeout);
	    throttleTimeout = setTimeout(function () {
	      func.apply(_this, args);
	      clearTimeout(throttleTimeout);
	    }, wait);
	    typeof cb === 'function' && cb();
	  };
	};
	var limbo = function limbo(promise) {
	  return !promise || !isFunc(promise.then) ? [new Error("A promise or thenable is required as the first argument!"), null] : promise.then(function (data) {
	    return [null, data];
	  })["catch"](function (err) {
	    return [err, undefined];
	  });
	};
	var uuid = function uuid(a) {
	  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
	};
	var cloneFunc = function cloneFunc(func) {
	  var funcRef = func;
	  var funcWrap = function funcWrap() {
	    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      args[_key7] = arguments[_key7];
	    }
	    return _construct(funcRef, args);
	  };
	  var funcClone = function funcClone() {
	    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	      args[_key8] = arguments[_key8];
	    }
	    return func instanceof funcClone ? funcWrap.apply(null, args) : funcRef.apply(func, args);
	  };
	  for (var key in func) {
	    func.hasOwnProperty(key) && (funcClone[key] = func[key]);
	  }
	  Object.defineProperty(funcClone, 'name', {
	    value: func.name,
	    configurable: true
	  });
	  funcClone.toString = function () {
	    return func.toString();
	  };
	  return funcClone;
	};
	var match$1 = function match(matchArg) {
	  for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	    args[_key9 - 1] = arguments[_key9];
	  }
	  if (!args.length) return null;
	  for (var _i = 0, _args = args; _i < _args.length; _i++) {
	    var entry = _args[_i];
	    if (!isArr(entry)) {
	      console.error("Matching case must be an entry (a 2-element array). Found: ".concat(typeOf(entry)), entry);
	      break;
	    }
	    var _entry = _slicedToArray(entry, 2),
	        caseValueOrPredicate = _entry[0],
	        valueOnMatch = _entry[1];
	    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch;
	    if (caseValueOrPredicate === matchArg) return valueOnMatch;
	  }
	  return null;
	};
	match$1["default"] = function () {
	  return true;
	};

	var buildPath = function buildPath() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  var built = args.reduce(function (path, arg) {
	    var str = toStr(arg);
	    return "".concat(path).concat(str && '/' + str || '');
	  }, '');
	  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
	};
	var snakeCase = function snakeCase(str) {
	  var underscored = delimitString(str, '_');
	  return underscored.toLowerCase();
	};
	var delimitString = function delimitString(str, delimiter) {
	  var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['-', '_', ' '];
	  if (!isStr(str)) return str;
	  var isDelimiter = function isDelimiter(c) {
	    return delimiters.some(function (del) {
	      return del === c;
	    });
	  };
	  var prevChar = '_';
	  return mapString(str, function (_char) {
	    if (isDelimiter(_char)) {
	      prevChar = delimiter;
	      return delimiter;
	    }
	    if (isUpperCase(_char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
	      prevChar = _char;
	      return delimiter + _char;
	    }
	    prevChar = _char;
	    return _char;
	  });
	};
	var mapString = function mapString(str, charMapper) {
	  if (!isStr(str)) return str;
	  if (!isFunc(charMapper)) return str;
	  var result = "";
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	  try {
	    for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _char2 = _step.value;
	      result += charMapper(_char2);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	        _iterator["return"]();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	  return result;
	};
	var camelCase = function camelCase(str, compCase) {
	  return str && cleanStr(str).split(/[\s_-]/gm).reduce(function (cased, word, index) {
	    if (!word) return cased;
	    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
	    return cased;
	  }, '') || str;
	};
	var cleanStr = function cleanStr(str) {
	  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
	};
	var capitalize = function capitalize(str) {
	  return isStr(str) && str[0] && "".concat(str[0].toUpperCase()).concat(str.slice(1).toLowerCase()) || str;
	};
	var containsStr = function containsStr(str, substring, fromIndex) {
	  str = !isStr(str) && toStr(str) || str;
	  substring = !isStr(substring) && toStr(substring) || substring;
	  return str.indexOf(substring, fromIndex) !== -1;
	};
	var eitherStr = function eitherStr(str1, str2) {
	  return isStr(str1) && str1 || str2;
	};
	var isEmail = function isEmail(str) {
	  if (!str || !isStr(str)) return false;
	  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	  return Boolean(regex.test(str));
	};
	var isPhone = function isPhone(str) {
	  if (!str || !isStr(str)) return false;
	  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
	};
	var isStr = function isStr(str) {
	  return typeof str === 'string';
	};
	var isUrl = function isUrl(str) {
	  var regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	  return Boolean(regex.test(str));
	};
	var isUuid = function isUuid(str) {
	  if (!str || !isStr(str)) return false;
	  var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
	  return Boolean(regex.test(str));
	};
	var parseJSON = function parseJSON(str) {
	  try {
	    return JSON.parse(str);
	  } catch (e) {
	    console.error(e.message);
	    return null;
	  }
	};
	var plural = function plural(str) {
	  if (!str || !str.length) return str;
	  return str[str.length - 1] !== 's' ? str + 's' : str;
	};
	var removeDot = function removeDot(string) {
	  var noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
	  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
	};
	var sanitize = function sanitize(str) {
	  return isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
	};
	var singular = function singular(str) {
	  if (!str || !str.length) return str;
	  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
	};
	var styleCase = function styleCase(str) {
	  if (!isStr) return str;
	  var cased = camelCase(str);
	  return "".concat(cased[0].toLowerCase()).concat(cased.slice(1));
	};
	var trainCase = function trainCase(str) {
	  return isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;
	};
	var toStr = function toStr(val) {
	  return val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);
	};
	var wordCaps = function wordCaps(str) {
	  if (!str) return str;
	  var cleaned = cleanStr(str);
	  return cleaned.split(' ').map(function (word) {
	    return word && capitalize(word) || '';
	  }).join(' ');
	};
	var isUpperCase = function isUpperCase(str) {
	  return str === str.toUpperCase();
	};
	var isLowerCase = function isLowerCase(str) {
	  return str === str.toLowerCase();
	};

	var isNonNegative = function isNonNegative(val) {
	  return isNum(val) && val >= 0;
	};
	var equalsNaN = function equalsNaN(val) {
	  return typeof val === 'number' && val != val;
	};
	var getNums = function getNums(val) {
	  return toStr(val).replace(/([^.\d])/gm, '');
	};
	var isFloat = function isFloat(val) {
	  return isNum(val) && val % 1 !== 0;
	};
	var isInt = function isInt(val) {
	  return isNum(val) && val % 1 === 0;
	};
	var isNum = function isNum(val) {
	  return typeof val === 'number' && !equalsNaN(val);
	};
	var nth = function nth(num) {
	  if (!isNum(num)) {
	    num = getNums(num);
	    if (!num) return '';
	    num = toNum(num);
	    if (equalsNaN(num)) return '';
	  }
	  var mod = num % 100;
	  if (mod >= 10 && mod <= 20) return 'th';
	  switch (num % 10) {
	    case 1:
	      return 'st';
	    case 2:
	      return 'nd';
	    case 3:
	      return 'rd';
	    default:
	      return 'th';
	  }
	};
	var toFloat = function toFloat(val) {
	  return val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;
	};
	var toInt = function toInt(val) {
	  return val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;
	};
	var toNum = function toNum(val) {
	  return isNum(val) ? val : val && !equalsNaN(val) && Number(getNums(val)) || 0;
	};

	var OPTIONS = {
	  SHOULD_LOG: true,
	  SHOULD_THROW: false,
	  LOG_PREFIX: null
	};
	var validate = function validate(argObj) {
	  var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$logs = _ref.logs,
	      logs = _ref$logs === void 0 ? OPTIONS.SHOULD_LOG : _ref$logs,
	      _ref$throws = _ref["throws"],
	      _throws = _ref$throws === void 0 ? OPTIONS.SHOULD_THROW : _ref$throws,
	      _ref$prefix = _ref.prefix,
	      prefix = _ref$prefix === void 0 ? OPTIONS.LOG_PREFIX : _ref$prefix;
	  var validationCaseEntries = Object.entries(argObj);
	  var defaultValidator = function defaultValidator() {
	    return true;
	  };
	  var validationResults = validationCaseEntries.map(function (_ref2) {
	    var _ref3 = _slicedToArray(_ref2, 2),
	        argName = _ref3[0],
	        argValue = _ref3[1];
	    return validateArgument(argName, argValue, validators[argName] || validators['$default'] || defaultValidator);
	  });
	  var reduceCases = function reduceCases(total, next) {
	    return validationReducer(total, next, {
	      logs: logs,
	      "throws": _throws,
	      prefix: prefix
	    });
	  };
	  var _validationResults$re = validationResults.reduce(reduceCases, {
	    success: true,
	    cases: {}
	  }),
	      success = _validationResults$re.success,
	      cases = _validationResults$re.cases;
	  return [success, cases];
	};
	validate.setOptions = function (_ref4) {
	  var logs = _ref4.logs,
	      _throws2 = _ref4["throws"],
	      prefix = _ref4.prefix;
	  if (logs !== undefined) {
	    OPTIONS.SHOULD_LOG = logs;
	  }
	  if (_throws2 !== undefined) {
	    OPTIONS.SHOULD_THROW = _throws2;
	  }
	  if (prefix !== undefined) {
	    OPTIONS.LOG_PREFIX = prefix;
	  }
	};
	validate.resetOptions = function () {
	  OPTIONS.SHOULD_LOG = true;
	  OPTIONS.SHOULD_THROW = false;
	  OPTIONS.LOG_PREFIX = null;
	};
	var validateArgument = function validateArgument(key, value, validator) {
	  var success = validator(value);
	  var shouldStringifyValidator = !validator.name || validator.name === key || validator.name === '$default';
	  var validatorString = shouldStringifyValidator ? validator.toString() : validator.name;
	  var reason = success ? null : ["Argument \"".concat(key, "\" with value "), value, " failed validator: ".concat(validatorString, ".")];
	  return {
	    success: success,
	    key: key,
	    value: value,
	    validator: validator,
	    reason: reason
	  };
	};
	var validationReducer = function validationReducer(finalResult, nextValidation, _ref5) {
	  var logs = _ref5.logs,
	      _throws3 = _ref5["throws"],
	      prefix = _ref5.prefix;
	  !nextValidation.success && handleFailure(nextValidation, logs, _throws3, prefix);
	  return {
	    success: finalResult.success && nextValidation.success,
	    cases: _objectSpread2({}, finalResult.cases, _defineProperty({}, nextValidation.key, nextValidation))
	  };
	};
	var handleFailure = function handleFailure(validation, shouldLog, shouldThrow, prefix) {
	  var _console;
	  var reason = prefix ? [prefix].concat(_toConsumableArray(validation.reason)) : validation.reason;
	  if (shouldThrow) throw new Error(reason.join());
	  if (shouldLog) (_console = console).error.apply(_console, _toConsumableArray(reason));
	};

	var randomArr = function randomArr(arr, amount) {
	  if (!isArr(arr)) return arr;
	  var useAmount = amount || 1;
	  var randoms = [];
	  for (var i = 0; i < useAmount; i++) {
	    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
	  }
	  return !amount ? randoms[0] : randoms;
	};
	var randomizeArr = function randomizeArr(arr) {
	  return !isArr(arr) && arr || arr.sort(function () {
	    return 0.5 - Math.random();
	  });
	};
	var uniqArr = function uniqArr(arr) {
	  return !isArr(arr) && arr || arr.filter(function (e, i, arr) {
	    return arr.indexOf(e) == i;
	  });
	};
	var isArr = function isArr(value) {
	  return Array.isArray(value);
	};
	var cloneArr = function cloneArr(arr) {
	  return Array.from(_toConsumableArray(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || []));
	};
	var omitRange = function omitRange(arr, startIndex, count) {
	  var _validate = validate({
	    arr: arr,
	    startIndex: startIndex,
	    count: count
	  }, {
	    arr: isArr,
	    $default: isNonNegative
	  }),
	      _validate2 = _slicedToArray(_validate, 1),
	      inputIsValid = _validate2[0];
	  if (!inputIsValid) return arr;
	  var nextArr = _toConsumableArray(arr);
	  nextArr.splice(startIndex, count);
	  return nextArr;
	};
	var flatMap = function flatMap(arr, mapFn) {
	  var _validate3 = validate({
	    arr: arr,
	    mapFn: mapFn
	  }, {
	    arr: isArr,
	    mapFn: isFunc
	  }),
	      _validate4 = _slicedToArray(_validate3, 1),
	      inputIsValid = _validate4[0];
	  if (!inputIsValid) return arr;
	  return arr.reduce(function (finalArr, current) {
	    var result = mapFn(current);
	    isArr(result) ? result.map(function (el) {
	      return finalArr.push(el);
	    }) : finalArr.push(result);
	    return finalArr;
	  }, []);
	};

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var FAILS_ON_PRIMITIVES$7 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
	var FORCED$5 = !descriptors || FAILS_ON_PRIMITIVES$7;
	_export({ target: 'Object', stat: true, forced: FORCED$5, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	var nativePromiseConstructor = global_1.Promise;

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set$2 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function (id) {
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};
	var listener = function (event) {
	  run(event.data);
	};
	var post = function (id) {
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};
	if (!set$2 || !clear) {
	  set$2 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  if (classofRaw(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    };
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}
	var task = {
	  set: set$2,
	  clear: clear
	};

	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task.set;
	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$2) == 'process';
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var flush, head, last, notify, toggle, node, promise, then;
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };
	  if (IS_NODE) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  } else if (Promise$1 && Promise$1.resolve) {
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  } else {
	    notify = function () {
	      macrotask.call(global_1, flush);
	    };
	  }
	}
	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};
	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};
	var newPromiseCapability = {
		f: f$7
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;
	var SPECIES$6 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$3 = internalState.get;
	var setInternalState$6 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
	var FORCED$6 = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    if (engineV8Version === 66) return true;
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () {  }, function () {  });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$6] = FakePromise;
	  return !(promise.then(function () {  }) instanceof FakePromise);
	});
	var INCORRECT_ITERATION$1 = FORCED$6 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () {  });
	});
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};
	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};
	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};
	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};
	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};
	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};
	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};
	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};
	if (FORCED$6) {
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$3(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  Internal = function Promise(executor) {
	    setInternalState$6(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$3(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    }, { unsafe: true });
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      fetch: function fetch(input ) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}
	_export({ global: true, wrap: true, forced: FORCED$6 }, {
	  Promise: PromiseConstructor
	});
	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);
	PromiseWrapper = getBuiltIn(PROMISE);
	_export({ target: PROMISE, stat: true, forced: FORCED$6 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});
	_export({ target: PROMISE, stat: true, forced:  FORCED$6 }, {
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});
	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var promisify = function promisify(method) {
	  if (!isFunc(method)) throw "Argument must be a function";
	  return function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    return new Promise(function (res, rej) {
	      if (!isFunc(args[args.length - 1])) return res(method.apply(void 0, args));
	      args.pop();
	      args.push(function () {
	        for (var _len2 = arguments.length, cbData = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          cbData[_key2] = arguments[_key2];
	        }
	        return cbData && cbData[0] ? rej.apply(void 0, cbData) : res.apply(void 0, cbData);
	      });
	      return method.apply(void 0, args);
	    });
	  };
	};
	var defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce(function (map, functionName) {
	  map[functionName] = true;
	  return map;
	}, {});
	var addAsync = function addAsync(object) {
	  if (!object.__IS_PROMISIFIED__) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	    try {
	      for (var _iterator = Object.getOwnPropertyNames(object)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var prop = _step.value;
	        var isAsync = prop.indexOf('Async') !== -1 || object["".concat(prop, "Async")];
	        if (isAsync || defObjProps[prop]) continue;
	        if (isFunc(object[prop])) object["".concat(prop, "Async")] = promisify(object[prop]);else {
	          var getValue = Object.getOwnPropertyDescriptor(object, prop).get;
	          if (isFunc(getValue)) object["".concat(prop, "Async")] = promisify(getValue);
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	          _iterator["return"]();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	    object.__IS_PROMISIFIED__ = true;
	  }
	  return object;
	};
	var promisifyAll = function promisifyAll(object) {
	  if (!isObj(object)) return object;
	  addAsync(object);
	  var proto = Object.getPrototypeOf(object);
	  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
	  return object;
	};
	var wait = function wait(time) {
	  return new Promise(function (res, rej) {
	    return setTimeout(function () {
	      return res(true);
	    }, time);
	  });
	};

	var queryToObj = function queryToObj(string) {
	  var currentQueryItems = {};
	  var stringSplit = string.split('?');
	  var querystring = stringSplit[stringSplit.length - 1];
	  if (!querystring) return currentQueryItems;
	  var split = querystring.split('&');
	  split.length && split.map(function (item) {
	    var components = item.split('=');
	    if (components.length <= 1) return currentQueryItems;
	    var itemSplit = [components.shift(), components.join('=')];
	    if (itemSplit.length === 2) {
	      var array = decodeURIComponent(itemSplit[1]).split(',');
	      if (array && array.length > 1) currentQueryItems[itemSplit[0]] = array;
	      else if (itemSplit[0] in currentQueryItems) {
	          var val = currentQueryItems[itemSplit[0]];
	          currentQueryItems[itemSplit[0]] = isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
	        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
	    }
	  });
	  return currentQueryItems;
	};
	var objToQuery = function objToQuery(obj) {
	  var firstSet;
	  return reduceObj(obj, function (key, value, urlStr) {
	    if (!value) return urlStr;
	    var useVal = isStr(value) || isNum(value) || isBool(value) ? value : isColl(value) ? isArr(value) ? value.join(',') : JSON.stringify(value) : null;
	    if (!useVal) return urlStr;
	    urlStr = !firstSet ? "?".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal)) : "".concat(urlStr, "&").concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal));
	    firstSet = true;
	    return urlStr;
	  }, '');
	};
	var isValidUrl = function isValidUrl(string) {
	  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	  return regexp.test(string);
	};

	exports.applyToCloneOf = applyToCloneOf;
	exports.applyToFunc = applyToFunc;
	exports.buildPath = buildPath;
	exports.camelCase = camelCase;
	exports.capitalize = capitalize;
	exports.checkCall = checkCall;
	exports.cleanStr = cleanStr;
	exports.clearObj = clearObj;
	exports.cloneArr = cloneArr;
	exports.cloneFunc = cloneFunc;
	exports.cloneJson = cloneJson;
	exports.containsStr = containsStr;
	exports.convertToStrBool = convertToStrBool;
	exports.debounce = debounce;
	exports.deepClone = deepClone;
	exports.deepFreeze = deepFreeze;
	exports.deepMerge = deepMerge;
	exports.delimitString = delimitString;
	exports.doIt = doIt;
	exports.either = either;
	exports.eitherFunc = eitherFunc;
	exports.eitherObj = eitherObj;
	exports.eitherStr = eitherStr;
	exports.equalsNaN = equalsNaN;
	exports.everyEntry = everyEntry;
	exports.filterObj = filterObj;
	exports.flatMap = flatMap;
	exports.get = get$1;
	exports.getNums = getNums;
	exports.hasOwn = hasOwn;
	exports.isArr = isArr;
	exports.isBool = isBool;
	exports.isColl = isColl;
	exports.isEmail = isEmail;
	exports.isEmpty = isEmpty;
	exports.isEmptyColl = isEmptyColl;
	exports.isEntry = isEntry;
	exports.isFloat = isFloat;
	exports.isFunc = isFunc;
	exports.isInt = isInt;
	exports.isLowerCase = isLowerCase;
	exports.isNonNegative = isNonNegative;
	exports.isNum = isNum;
	exports.isObj = isObj;
	exports.isPhone = isPhone;
	exports.isSame = isSame;
	exports.isStr = isStr;
	exports.isStrBool = isStrBool;
	exports.isUpperCase = isUpperCase;
	exports.isUrl = isUrl;
	exports.isUuid = isUuid;
	exports.isValidDate = isValidDate;
	exports.isValidUrl = isValidUrl;
	exports.jsonEqual = jsonEqual;
	exports.keyMap = keyMap;
	exports.limbo = limbo;
	exports.logData = logData;
	exports.mapColl = mapColl;
	exports.mapEntries = mapEntries;
	exports.mapKeys = mapKeys;
	exports.mapObj = mapObj;
	exports.mapString = mapString;
	exports.match = match$1;
	exports.memorize = memorize;
	exports.nth = nth;
	exports.objToQuery = objToQuery;
	exports.omitKeys = omitKeys;
	exports.omitRange = omitRange;
	exports.parseJSON = parseJSON;
	exports.pickKeys = pickKeys;
	exports.pipeline = pipeline;
	exports.plural = plural;
	exports.promisify = promisify;
	exports.promisifyAll = promisifyAll;
	exports.queryToObj = queryToObj;
	exports.randomArr = randomArr;
	exports.randomizeArr = randomizeArr;
	exports.reduceColl = reduceColl;
	exports.reduceObj = reduceObj;
	exports.removeDot = removeDot;
	exports.repeat = repeat;
	exports.resetLogs = resetLogs;
	exports.sanitize = sanitize;
	exports.sanitizeCopy = sanitizeCopy;
	exports.set = set$1;
	exports.setLogs = setLogs;
	exports.shallowEqual = shallowEqual;
	exports.singular = singular;
	exports.snakeCase = snakeCase;
	exports.softFalsy = softFalsy;
	exports.someEntry = someEntry;
	exports.strToType = strToType;
	exports.styleCase = styleCase;
	exports.throttle = throttle;
	exports.throttleLast = throttleLast;
	exports.toBool = toBool;
	exports.toFloat = toFloat;
	exports.toInt = toInt;
	exports.toNum = toNum;
	exports.toObj = toObj;
	exports.toStr = toStr;
	exports.trainCase = trainCase;
	exports.trimStringFields = trimStringFields;
	exports.typeOf = typeOf;
	exports.uniqArr = uniqArr;
	exports.unset = unset;
	exports.uuid = uuid;
	exports.validate = validate;
	exports.wait = wait;
	exports.wordCaps = wordCaps;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
