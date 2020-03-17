'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');

var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var functionBindContext = function (fn, that, length) {
  aFunction(fn);
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

var push = [].push;
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = es_array_concat.toObject($this);
    var self = es_array_concat.IndexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = es_array_concat.toLength(self.length);
    var index = 0;
    var create = specificCreate || es_array_concat.arraySpeciesCreate;
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
  forEach: createMethod(0),
  map: createMethod(1),
  filter: createMethod(2),
  some: createMethod(3),
  every: createMethod(4),
  find: createMethod(5),
  findIndex: createMethod(6)
};

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(es_array_concat.requireObjectCoercible($this));
    var position = es_array_concat.toInteger(pos);
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
  codeAt: createMethod$1(false),
  charAt: createMethod$1(true)
};

var SPECIES = es_array_concat.wellKnownSymbol('species');
var speciesConstructor = function (O, defaultConstructor) {
  var C = es_array_concat.anObject(O).constructor;
  var S;
  return C === undefined || (S = es_array_concat.anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

exports.ArrayIterationModule = arrayIteration;
exports.aFunction = aFunction;
exports.bind = functionBindContext;
exports.require$$0 = stringMultibyte;
exports.speciesConstructor = speciesConstructor;
