'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');
var speciesConstructor = require('./species-constructor-736ba485.js');
var web_domCollections_iterator = require('./web.dom-collections.iterator-a6008c5a.js');

var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(es_array_concat.anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) es_array_concat.anObject(returnMethod.call(iterator));
    throw error;
  }
};

var ITERATOR = es_array_concat.wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (web_domCollections_iterator.Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

var ITERATOR$1 = es_array_concat.wellKnownSymbol('iterator');
var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || web_domCollections_iterator.Iterators[web_domCollections_iterator.classof(it)];
};

var arrayFrom = function from(arrayLike ) {
  var O = es_array_concat.toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = speciesConstructor.bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      es_array_concat.createProperty(result, index, value);
    }
  } else {
    length = es_array_concat.toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      es_array_concat.createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var ITERATOR$2 = es_array_concat.wellKnownSymbol('iterator');
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
es_array_concat.$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: arrayFrom
});

var iterate_1 = es_array_concat.createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};
var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = speciesConstructor.bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;
  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = es_array_concat.toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(es_array_concat.anObject(step = iterable[index])[0], step[1])
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

var redefineAll = function (target, src, options) {
  for (var key in src) es_array_concat.redefine(target, key, src[key], options);
  return target;
};

var SPECIES = es_array_concat.wellKnownSymbol('species');
var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = es_array_concat.getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = es_array_concat.objectDefinePropertyModule.f;
  if (es_array_concat.DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var FAILS_ON_PRIMITIVES = es_array_concat.fails(function () { web_domCollections_iterator.nativeGetPrototypeOf(1); });
es_array_concat.$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !web_domCollections_iterator.CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return web_domCollections_iterator.nativeGetPrototypeOf(es_array_concat.toObject(it));
  }
});

exports.anInstance = anInstance;
exports.checkCorrectnessOfIteration = checkCorrectnessOfIteration;
exports.iterate = iterate_1;
exports.redefineAll = redefineAll;
exports.setSpecies = setSpecies;
