'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var es_array_concat = require('./es.array.concat-207a854d.js');
var speciesConstructor = require('./species-constructor-736ba485.js');
require('./array-411f3373.js');
var es_object_getPrototypeOf = require('./es.object.get-prototype-of-38cc319f.js');
var web_domCollections_iterator = require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.array.index-of-043c7818.js');
var object = require('./object-38f445e5.js');
require('./es.string.split-893ff521.js');
require('./number-a23c768f.js');
require('./string-70ad3fa2.js');
var method = require('./method.js');
require('./web.timers-37faa3ac.js');
require('./es.object.get-own-property-names-7a04c850.js');
require('./log.js');
require('./collection.js');
require('./boolean.js');
require('./ext.js');

var nativeGetOwnPropertyDescriptor = es_array_concat.require$$0.f;
var FAILS_ON_PRIMITIVES = es_array_concat.fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !es_array_concat.DESCRIPTORS || FAILS_ON_PRIMITIVES;
es_array_concat.$({ target: 'Object', stat: true, forced: FORCED, sham: !es_array_concat.DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(es_array_concat.toIndexedObject(it), key);
  }
});

var nativePromiseConstructor = es_array_concat.global.Promise;

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(es_array_concat.userAgent);

var location = es_array_concat.global.location;
var set = es_array_concat.global.setImmediate;
var clear = es_array_concat.global.clearImmediate;
var process = es_array_concat.global.process;
var MessageChannel = es_array_concat.global.MessageChannel;
var Dispatch = es_array_concat.global.Dispatch;
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
  es_array_concat.global.postMessage(id + '', location.protocol + '//' + location.host);
};
if (!set || !clear) {
  set = function setImmediate(fn) {
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
  if (es_array_concat.classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = speciesConstructor.bind(port.postMessage, port, 1);
  } else if (es_array_concat.global.addEventListener && typeof postMessage == 'function' && !es_array_concat.global.importScripts && !es_array_concat.fails(post)) {
    defer = post;
    es_array_concat.global.addEventListener('message', listener, false);
  } else if (ONREADYSTATECHANGE in es_array_concat.createElement('script')) {
    defer = function (id) {
      web_domCollections_iterator.html.appendChild(es_array_concat.createElement('script'))[ONREADYSTATECHANGE] = function () {
        web_domCollections_iterator.html.removeChild(this);
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
  set: set,
  clear: clear
};

var getOwnPropertyDescriptor = es_array_concat.require$$0.f;
var macrotask = task.set;
var MutationObserver = es_array_concat.global.MutationObserver || es_array_concat.global.WebKitMutationObserver;
var process$1 = es_array_concat.global.process;
var Promise$1 = es_array_concat.global.Promise;
var IS_NODE = es_array_concat.classof(process$1) == 'process';
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(es_array_concat.global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then;
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$1.domain)) parent.exit();
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
      process$1.nextTick(flush);
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
      macrotask.call(es_array_concat.global, flush);
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
  this.resolve = speciesConstructor.aFunction(resolve);
  this.reject = speciesConstructor.aFunction(reject);
};
var f = function (C) {
  return new PromiseCapability(C);
};
var newPromiseCapability = {
	f: f
};

var promiseResolve = function (C, x) {
  es_array_concat.anObject(C);
  if (es_array_concat.isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = es_array_concat.global.console;
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
var SPECIES = es_array_concat.wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = es_array_concat.InternalStateModule.get;
var setInternalState = es_array_concat.InternalStateModule.set;
var getInternalPromiseState = es_array_concat.InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = es_array_concat.global.TypeError;
var document$1 = es_array_concat.global.document;
var process$2 = es_array_concat.global.process;
var $fetch = es_array_concat.getBuiltIn('fetch');
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var IS_NODE$1 = es_array_concat.classof(process$2) == 'process';
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && es_array_concat.global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED$1 = es_array_concat.isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = es_array_concat.inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    if (es_array_concat.V8_VERSION === 66) return true;
    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
  }
  if (es_array_concat.V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () {  }, function () {  });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () {  }) instanceof FakePromise);
});
var INCORRECT_ITERATION = FORCED$1 || !es_object_getPrototypeOf.checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {  });
});
var isThenable = function (it) {
  var then;
  return es_array_concat.isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    es_array_concat.global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = es_array_concat.global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};
var onUnhandled = function (promise, state) {
  task$1.call(es_array_concat.global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process$2.emit('unhandledRejection', value, promise);
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
  task$1.call(es_array_concat.global, function () {
    if (IS_NODE$1) {
      process$2.emit('rejectionHandled', promise);
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
if (FORCED$1) {
  PromiseConstructor = function Promise(executor) {
    es_object_getPrototypeOf.anInstance(this, PromiseConstructor, PROMISE);
    speciesConstructor.aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  Internal = function Promise(executor) {
    setInternalState(this, {
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
  Internal.prototype = es_object_getPrototypeOf.redefineAll(PromiseConstructor.prototype, {
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor.speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$2.domain : undefined;
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
    var state = getInternalState(promise);
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
    es_array_concat.redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    }, { unsafe: true });
    if (typeof $fetch == 'function') es_array_concat.$({ global: true, enumerable: true, forced: true }, {
      fetch: function fetch(input ) {
        return promiseResolve(PromiseConstructor, $fetch.apply(es_array_concat.global, arguments));
      }
    });
  }
}
es_array_concat.$({ global: true, wrap: true, forced: FORCED$1 }, {
  Promise: PromiseConstructor
});
web_domCollections_iterator.setToStringTag(PromiseConstructor, PROMISE, false);
es_object_getPrototypeOf.setSpecies(PROMISE);
PromiseWrapper = es_array_concat.getBuiltIn(PROMISE);
es_array_concat.$({ target: PROMISE, stat: true, forced: FORCED$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
es_array_concat.$({ target: PROMISE, stat: true, forced:  FORCED$1 }, {
  resolve: function resolve(x) {
    return promiseResolve( this, x);
  }
});
es_array_concat.$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = speciesConstructor.aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      es_object_getPrototypeOf.iterate(iterable, function (promise) {
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
      var $promiseResolve = speciesConstructor.aFunction(C.resolve);
      es_object_getPrototypeOf.iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var promisify = function promisify(method$1) {
  if (!method.isFunc(method$1)) throw "Argument must be a function";
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function (res, rej) {
      if (!method.isFunc(args[args.length - 1])) return res(method$1.apply(void 0, args));
      args.pop();
      args.push(function () {
        for (var _len2 = arguments.length, cbData = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          cbData[_key2] = arguments[_key2];
        }
        return cbData && cbData[0] ? rej.apply(void 0, cbData) : res.apply(void 0, cbData);
      });
      return method$1.apply(void 0, args);
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
        if (method.isFunc(object[prop])) object["".concat(prop, "Async")] = promisify(object[prop]);else {
          var getValue = Object.getOwnPropertyDescriptor(object, prop).get;
          if (method.isFunc(getValue)) object["".concat(prop, "Async")] = promisify(getValue);
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
var promisifyAll = function promisifyAll(object$1) {
  if (!object.isObj(object$1)) return object$1;
  addAsync(object$1);
  var proto = Object.getPrototypeOf(object$1);
  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
  return object$1;
};
var wait = function wait(time) {
  return new Promise(function (res, rej) {
    return setTimeout(function () {
      return res(true);
    }, time);
  });
};

exports.promisify = promisify;
exports.promisifyAll = promisifyAll;
exports.wait = wait;
