import { T as userAgent, $, G as global } from './es.array.concat-2cad827a.js';

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent);
var wrap = function (scheduler) {
  return function (handler, timeout ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};
$({ global: true, bind: true, forced: MSIE }, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
