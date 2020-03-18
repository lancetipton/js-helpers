'use strict';

var typeOf = function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};

exports.typeOf = typeOf;
