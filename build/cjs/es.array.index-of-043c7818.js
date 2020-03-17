'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');

var $indexOf = es_array_concat.require$$0$1.indexOf;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = es_array_concat.arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = es_array_concat.arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
es_array_concat.$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement ) {
    return NEGATIVE_ZERO
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});
