import { g as fails, $ } from './es.array.concat-2cad827a.js';
import { r as require$$0 } from './web.dom-collections.iterator-ec5cce15.js';

var nativeGetOwnPropertyNames = require$$0.f;
var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});
