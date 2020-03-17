'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');

var slice = [].slice;
var MSIE = /MSIE .\./.test(es_array_concat.userAgent);
var wrap = function (scheduler) {
  return function (handler, timeout ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};
es_array_concat.$({ global: true, bind: true, forced: MSIE }, {
  setTimeout: wrap(es_array_concat.global.setTimeout),
  setInterval: wrap(es_array_concat.global.setInterval)
});
