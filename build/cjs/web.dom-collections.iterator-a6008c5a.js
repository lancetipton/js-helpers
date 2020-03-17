'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');
var speciesConstructor = require('./species-constructor-736ba485.js');

var iterators = {};

var TO_STRING_TAG = es_array_concat.wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = es_array_concat.wellKnownSymbol('toStringTag');
var CORRECT_ARGUMENTS = es_array_concat.classof(function () { return arguments; }()) == 'Arguments';
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {  }
};
var classof = toStringTagSupport ? es_array_concat.classof : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    : CORRECT_ARGUMENTS ? es_array_concat.classof(O)
    : (result = es_array_concat.classof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    speciesConstructor.aFunction(callbackfn);
    var O = es_array_concat.toObject(that);
    var self = es_array_concat.IndexedObject(O);
    var length = es_array_concat.toLength(O.length);
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
  left: createMethod(false),
  right: createMethod(true)
};

var $reduce = arrayReduce.left;
var STRICT_METHOD = es_array_concat.arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = es_array_concat.arrayMethodUsesToLength('reduce', { 1: 0 });
es_array_concat.$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var objectKeys = Object.keys || function keys(O) {
  return es_array_concat.internalObjectKeys(O, es_array_concat.enumBugKeys);
};

var correctPrototypeGetter = !es_array_concat.fails(function () {
  function F() {  }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = es_array_concat.sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = es_array_concat.toObject(O);
  if (es_array_concat.$has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = es_array_concat.wellKnownSymbol('iterator');
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
if ( !es_array_concat.$has(IteratorPrototype, ITERATOR)) {
  es_array_concat.createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}
var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var objectDefineProperties = es_array_concat.DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  es_array_concat.anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) es_array_concat.objectDefinePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = es_array_concat.getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = es_array_concat.sharedKey('IE_PROTO');
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
  var iframe = es_array_concat.createElement('iframe');
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
  var length = es_array_concat.enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][es_array_concat.enumBugKeys[length]];
  return NullProtoObject();
};
es_array_concat.hiddenKeys[IE_PROTO$1] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = es_array_concat.anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var defineProperty = es_array_concat.objectDefinePropertyModule.f;
var TO_STRING_TAG$2 = es_array_concat.wellKnownSymbol('toStringTag');
var setToStringTag = function (it, TAG, STATIC) {
  if (it && !es_array_concat.$has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var returnThis$1 = function () { return this; };
var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: es_array_concat.createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!es_array_concat.isObject(it) && it !== null) {
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
    es_array_concat.anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = es_array_concat.wellKnownSymbol('iterator');
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
  var nativeIterator = IterablePrototype[ITERATOR$1]
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
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          es_array_concat.createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
        }
      }
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    es_array_concat.createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
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
        es_array_concat.redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else es_array_concat.$({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }
  return methods;
};

var charAt = speciesConstructor.require$$0.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState = es_array_concat.InternalStateModule.set;
var getInternalState = es_array_concat.InternalStateModule.getterFor(STRING_ITERATOR);
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

var nativeGetOwnPropertyNames = es_array_concat.require$$1.f;
var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];
var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};
var f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(es_array_concat.toIndexedObject(it));
};
var objectGetOwnPropertyNamesExternal = {
	f: f
};

var f$1 = es_array_concat.wellKnownSymbol;
var wellKnownSymbolWrapped = {
	f: f$1
};

var defineProperty$1 = es_array_concat.objectDefinePropertyModule.f;
var defineWellKnownSymbol = function (NAME) {
  var Symbol = es_array_concat.path.Symbol || (es_array_concat.path.Symbol = {});
  if (!es_array_concat.$has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

var $forEach = speciesConstructor.ArrayIterationModule.forEach;
var HIDDEN = es_array_concat.sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = es_array_concat.wellKnownSymbol('toPrimitive');
var setInternalState$1 = es_array_concat.InternalStateModule.set;
var getInternalState$1 = es_array_concat.InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype$1 = Object[PROTOTYPE$1];
var $Symbol = es_array_concat.global.Symbol;
var $stringify = es_array_concat.getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = es_array_concat.require$$0.f;
var nativeDefineProperty = es_array_concat.objectDefinePropertyModule.f;
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = es_array_concat.propertyIsEnumerableModule.f;
var AllSymbols = es_array_concat.shared('symbols');
var ObjectPrototypeSymbols = es_array_concat.shared('op-symbols');
var StringToSymbolRegistry = es_array_concat.shared('string-to-symbol-registry');
var SymbolToStringRegistry = es_array_concat.shared('symbol-to-string-registry');
var WellKnownSymbolsStore = es_array_concat.shared('wks');
var QObject = es_array_concat.global.QObject;
var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;
var setSymbolDescriptor = es_array_concat.DESCRIPTORS && es_array_concat.fails(function () {
  return objectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;
var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState$1(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!es_array_concat.DESCRIPTORS) symbol.description = description;
  return symbol;
};
var isSymbol = es_array_concat.USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};
var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  es_array_concat.anObject(O);
  var key = es_array_concat.toPrimitive(P, true);
  es_array_concat.anObject(Attributes);
  if (es_array_concat.$has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!es_array_concat.$has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, es_array_concat.createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (es_array_concat.$has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, { enumerable: es_array_concat.createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};
var $defineProperties = function defineProperties(O, Properties) {
  es_array_concat.anObject(O);
  var properties = es_array_concat.toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!es_array_concat.DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};
var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};
var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = es_array_concat.toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype$1 && es_array_concat.$has(AllSymbols, P) && !es_array_concat.$has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !es_array_concat.$has(this, P) || !es_array_concat.$has(AllSymbols, P) || es_array_concat.$has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = es_array_concat.toIndexedObject(O);
  var key = es_array_concat.toPrimitive(P, true);
  if (it === ObjectPrototype$1 && es_array_concat.$has(AllSymbols, key) && !es_array_concat.$has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && es_array_concat.$has(AllSymbols, key) && !(es_array_concat.$has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};
var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$1(es_array_concat.toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!es_array_concat.$has(AllSymbols, key) && !es_array_concat.$has(es_array_concat.hiddenKeys, key)) result.push(key);
  });
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : es_array_concat.toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (es_array_concat.$has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || es_array_concat.$has(ObjectPrototype$1, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};
if (!es_array_concat.NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = es_array_concat.uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
      if (es_array_concat.$has(this, HIDDEN) && es_array_concat.$has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, es_array_concat.createPropertyDescriptor(1, value));
    };
    if (es_array_concat.DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };
  es_array_concat.redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$1(this).tag;
  });
  es_array_concat.redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(es_array_concat.uid(description), description);
  });
  es_array_concat.propertyIsEnumerableModule.f = $propertyIsEnumerable;
  es_array_concat.objectDefinePropertyModule.f = $defineProperty;
  es_array_concat.require$$0.f = $getOwnPropertyDescriptor;
  es_array_concat.require$$1.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  es_array_concat.getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
  wellKnownSymbolWrapped.f = function (name) {
    return wrap(es_array_concat.wellKnownSymbol(name), name);
  };
  if (es_array_concat.DESCRIPTORS) {
    nativeDefineProperty($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$1(this).description;
      }
    });
    {
      es_array_concat.redefine(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}
es_array_concat.$({ global: true, wrap: true, forced: !es_array_concat.NATIVE_SYMBOL, sham: !es_array_concat.NATIVE_SYMBOL }, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
es_array_concat.$({ target: SYMBOL, stat: true, forced: !es_array_concat.NATIVE_SYMBOL }, {
  'for': function (key) {
    var string = String(key);
    if (es_array_concat.$has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (es_array_concat.$has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});
es_array_concat.$({ target: 'Object', stat: true, forced: !es_array_concat.NATIVE_SYMBOL, sham: !es_array_concat.DESCRIPTORS }, {
  create: $create,
  defineProperty: $defineProperty,
  defineProperties: $defineProperties,
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
es_array_concat.$({ target: 'Object', stat: true, forced: !es_array_concat.NATIVE_SYMBOL }, {
  getOwnPropertyNames: $getOwnPropertyNames,
  getOwnPropertySymbols: $getOwnPropertySymbols
});
es_array_concat.$({ target: 'Object', stat: true, forced: es_array_concat.fails(function () { es_array_concat.getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return es_array_concat.getOwnPropertySymbolsModule.f(es_array_concat.toObject(it));
  }
});
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !es_array_concat.NATIVE_SYMBOL || es_array_concat.fails(function () {
    var symbol = $Symbol();
    return $stringify([symbol]) != '[null]'
      || $stringify({ a: symbol }) != '{}'
      || $stringify(Object(symbol)) != '{}';
  });
  es_array_concat.$({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!es_array_concat.isObject(replacer) && it === undefined || isSymbol(it)) return;
      if (!es_array_concat.isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}
if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  es_array_concat.createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
}
setToStringTag($Symbol, SYMBOL);
es_array_concat.hiddenKeys[HIDDEN] = true;

var defineProperty$2 = es_array_concat.objectDefinePropertyModule.f;
var NativeSymbol = es_array_concat.global.Symbol;
if (es_array_concat.DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
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
  es_array_concat.copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$2(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = es_array_concat.isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (es_array_concat.$has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });
  es_array_concat.$({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

defineWellKnownSymbol('iterator');

var UNSCOPABLES = es_array_concat.wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  es_array_concat.objectDefinePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = es_array_concat.InternalStateModule.set;
var getInternalState$2 = es_array_concat.InternalStateModule.getterFor(ARRAY_ITERATOR);
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: es_array_concat.toIndexedObject(iterated),
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

var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

if (!toStringTagSupport) {
  es_array_concat.redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

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

var ITERATOR$2 = es_array_concat.wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = es_array_concat.wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;
for (var COLLECTION_NAME in domIterables) {
  var Collection = es_array_concat.global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      es_array_concat.createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$3]) {
      es_array_concat.createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
    }
    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        es_array_concat.createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

exports.CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
exports.Iterators = iterators;
exports.classof = classof;
exports.create = objectCreate;
exports.defineIterator = defineIterator;
exports.html = html;
exports.nativeGetPrototypeOf = objectGetPrototypeOf;
exports.nativeKeys = objectKeys;
exports.require$$0 = objectGetOwnPropertyNamesExternal;
exports.setPrototypeOf = objectSetPrototypeOf;
exports.setToStringTag = setToStringTag;
