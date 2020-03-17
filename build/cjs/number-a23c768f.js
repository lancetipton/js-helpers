'use strict';

var es_array_concat = require('./es.array.concat-207a854d.js');
var web_domCollections_iterator = require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.string.split-893ff521.js');
var string = require('./string-70ad3fa2.js');

var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    web_domCollections_iterator.setPrototypeOf &&
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    es_array_concat.isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) web_domCollections_iterator.setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var getOwnPropertyNames = es_array_concat.require$$1.f;
var getOwnPropertyDescriptor = es_array_concat.require$$0.f;
var defineProperty = es_array_concat.objectDefinePropertyModule.f;
var trim = string.require$$0.trim;
var NUMBER = 'Number';
var NativeNumber = es_array_concat.global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var BROKEN_CLASSOF = es_array_concat.classof(web_domCollections_iterator.create(NumberPrototype)) == NUMBER;
var toNumber = function (argument) {
  var it = es_array_concat.toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN;
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break;
        case 79: case 111: radix = 8; maxCode = 55; break;
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};
if (es_array_concat.isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      && (BROKEN_CLASSOF ? es_array_concat.fails(function () { NumberPrototype.valueOf.call(dummy); }) : es_array_concat.classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = es_array_concat.DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (es_array_concat.$has(NativeNumber, key = keys[j]) && !es_array_concat.$has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  es_array_concat.redefine(es_array_concat.global, NUMBER, NumberWrapper);
}

var trim$1 = string.require$$0.trim;
var $parseFloat = es_array_concat.global.parseFloat;
var FORCED = 1 / $parseFloat(string.whitespaces + '-0') !== -Infinity;
var numberParseFloat = FORCED ? function parseFloat(string) {
  var trimmedString = trim$1(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

es_array_concat.$({ global: true, forced: parseFloat != numberParseFloat }, {
  parseFloat: numberParseFloat
});

var trim$2 = string.require$$0.trim;
var $parseInt = es_array_concat.global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$1 = $parseInt(string.whitespaces + '08') !== 8 || $parseInt(string.whitespaces + '0x16') !== 22;
var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
  var S = trim$2(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

es_array_concat.$({ global: true, forced: parseInt != numberParseInt }, {
  parseInt: numberParseInt
});

var isNonNegative = function isNonNegative(val) {
  return isNum(val) && val >= 0;
};
var equalsNaN = function equalsNaN(val) {
  return typeof val === 'number' && val != val;
};
var getNums = function getNums(val) {
  return string.toStr(val).replace(/([^.\d])/gm, '');
};
var isFloat = function isFloat(val) {
  return isNum(val) && val % 1 !== 0;
};
var isInt = function isInt(val) {
  return isNum(val) && val % 1 === 0;
};
var isNum = function isNum(val) {
  return typeof val === 'number' && !equalsNaN(val);
};
var nth = function nth(num) {
  if (!isNum(num)) {
    num = getNums(num);
    if (!num) return '';
    num = toNum(num);
    if (equalsNaN(num)) return '';
  }
  var mod = num % 100;
  if (mod >= 10 && mod <= 20) return 'th';
  switch (num % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
var toFloat = function toFloat(val) {
  return val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;
};
var toInt = function toInt(val) {
  return val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;
};
var toNum = function toNum(val) {
  return isNum(val) ? val : val && !equalsNaN(val) && Number(getNums(val)) || 0;
};

exports.equalsNaN = equalsNaN;
exports.getNums = getNums;
exports.inheritIfRequired = inheritIfRequired;
exports.isFloat = isFloat;
exports.isInt = isInt;
exports.isNonNegative = isNonNegative;
exports.isNum = isNum;
exports.nth = nth;
exports.toFloat = toFloat;
exports.toInt = toInt;
exports.toNum = toNum;
