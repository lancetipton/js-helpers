'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');
var web_domCollections_iterator = require('./web.dom-collections.iterator-a6008c5a.js');

var nativeGetOwnPropertyNames = web_domCollections_iterator.require$$0.f;
var FAILS_ON_PRIMITIVES = es_array_concat.fails(function () { return !Object.getOwnPropertyNames(1); });
es_array_concat.$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});
