import { A as isObject, G as global, n as classof, S as isForced, D as DESCRIPTORS, u as $has, l as redefine, E as require$$1, K as require$$0, o as objectDefinePropertyModule, g as fails, L as toPrimitive, $ } from './es.array.concat-2cad827a.js';
import { s as setPrototypeOf, b as create } from './web.dom-collections.iterator-ec5cce15.js';
import './es.string.split-3996f72b.js';
import { r as require$$0$1, w as whitespaces, t as toStr } from './string-0069576a.js';

var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    setPrototypeOf &&
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var getOwnPropertyNames = require$$1.f;
var getOwnPropertyDescriptor = require$$0.f;
var defineProperty = objectDefinePropertyModule.f;
var trim = require$$0$1.trim;
var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
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
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if ($has(NativeNumber, key = keys[j]) && !$has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}

var trim$1 = require$$0$1.trim;
var $parseFloat = global.parseFloat;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;
var numberParseFloat = FORCED ? function parseFloat(string) {
  var trimmedString = trim$1(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

$({ global: true, forced: parseFloat != numberParseFloat }, {
  parseFloat: numberParseFloat
});

var trim$2 = require$$0$1.trim;
var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;
var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
  var S = trim$2(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

$({ global: true, forced: parseInt != numberParseInt }, {
  parseInt: numberParseInt
});

var isNonNegative = function isNonNegative(val) {
  return isNum(val) && val >= 0;
};
var equalsNaN = function equalsNaN(val) {
  return typeof val === 'number' && val != val;
};
var getNums = function getNums(val) {
  return toStr(val).replace(/([^.\d])/gm, '');
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

export { isNum as a, isFloat as b, isInt as c, toInt as d, equalsNaN as e, toNum as f, getNums as g, inheritIfRequired as h, isNonNegative as i, nth as n, toFloat as t };
