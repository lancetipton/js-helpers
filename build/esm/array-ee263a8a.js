import { e as arrayMethodHasSpeciesSupport, f as arrayMethodUsesToLength, $, g as fails, h as arrayMethodIsStrict, t as toObject, a as toLength, i as toAbsoluteIndex, c as toInteger, b as arraySpeciesCreate, j as createProperty } from './es.array.concat-2cad827a.js';
import { A as ArrayIterationModule, a as aFunction } from './species-constructor-e56845e3.js';
import './es.object.get-prototype-of-95b6b85b.js';
import './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import { _ as _slicedToArray, a as _objectSpread2, b as _defineProperty, c as _toConsumableArray, i as isObj } from './object-f4dd8b1b.js';
import './es.string.split-3996f72b.js';
import { i as isNonNegative } from './number-115728d2.js';
import { isFunc } from './method.js';

var $filter = ArrayIterationModule.filter;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var test = [];
var nativeSort = test.sort;
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
var STRICT_METHOD = arrayMethodIsStrict('sort');
var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$1 }, {
  splice: function splice(start, deleteCount ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var OPTIONS = {
  SHOULD_LOG: true,
  SHOULD_THROW: false,
  LOG_PREFIX: null
};
var validate = function validate(argObj) {
  var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$logs = _ref.logs,
      logs = _ref$logs === void 0 ? OPTIONS.SHOULD_LOG : _ref$logs,
      _ref$throws = _ref["throws"],
      _throws = _ref$throws === void 0 ? OPTIONS.SHOULD_THROW : _ref$throws,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? OPTIONS.LOG_PREFIX : _ref$prefix;
  var validationCaseEntries = Object.entries(argObj);
  var defaultValidator = function defaultValidator() {
    return true;
  };
  var validationResults = validationCaseEntries.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        argName = _ref3[0],
        argValue = _ref3[1];
    return validateArgument(argName, argValue, validators[argName] || validators['$default'] || defaultValidator);
  });
  var reduceCases = function reduceCases(total, next) {
    return validationReducer(total, next, {
      logs: logs,
      "throws": _throws,
      prefix: prefix
    });
  };
  var _validationResults$re = validationResults.reduce(reduceCases, {
    success: true,
    cases: {}
  }),
      success = _validationResults$re.success,
      cases = _validationResults$re.cases;
  return [success, cases];
};
validate.setOptions = function (_ref4) {
  var logs = _ref4.logs,
      _throws2 = _ref4["throws"],
      prefix = _ref4.prefix;
  if (logs !== undefined) {
    OPTIONS.SHOULD_LOG = logs;
  }
  if (_throws2 !== undefined) {
    OPTIONS.SHOULD_THROW = _throws2;
  }
  if (prefix !== undefined) {
    OPTIONS.LOG_PREFIX = prefix;
  }
};
validate.resetOptions = function () {
  OPTIONS.SHOULD_LOG = true;
  OPTIONS.SHOULD_THROW = false;
  OPTIONS.LOG_PREFIX = null;
};
var validateArgument = function validateArgument(key, value, validator) {
  var success = validator(value);
  var shouldStringifyValidator = !validator.name || validator.name === key || validator.name === '$default';
  var validatorString = shouldStringifyValidator ? validator.toString() : validator.name;
  var reason = success ? null : ["Argument \"".concat(key, "\" with value "), value, " failed validator: ".concat(validatorString, ".")];
  return {
    success: success,
    key: key,
    value: value,
    validator: validator,
    reason: reason
  };
};
var validationReducer = function validationReducer(finalResult, nextValidation, _ref5) {
  var logs = _ref5.logs,
      _throws3 = _ref5["throws"],
      prefix = _ref5.prefix;
  !nextValidation.success && handleFailure(nextValidation, logs, _throws3, prefix);
  return {
    success: finalResult.success && nextValidation.success,
    cases: _objectSpread2({}, finalResult.cases, _defineProperty({}, nextValidation.key, nextValidation))
  };
};
var handleFailure = function handleFailure(validation, shouldLog, shouldThrow, prefix) {
  var _console;
  var reason = prefix ? [prefix].concat(_toConsumableArray(validation.reason)) : validation.reason;
  if (shouldThrow) throw new Error(reason.join());
  if (shouldLog) (_console = console).error.apply(_console, _toConsumableArray(reason));
};

var randomArr = function randomArr(arr, amount) {
  if (!isArr(arr)) return arr;
  var useAmount = amount || 1;
  var randoms = [];
  for (var i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return !amount ? randoms[0] : randoms;
};
var randomizeArr = function randomizeArr(arr) {
  return !isArr(arr) && arr || arr.sort(function () {
    return 0.5 - Math.random();
  });
};
var uniqArr = function uniqArr(arr) {
  return !isArr(arr) && arr || arr.filter(function (e, i, arr) {
    return arr.indexOf(e) == i;
  });
};
var isArr = function isArr(value) {
  return Array.isArray(value);
};
var cloneArr = function cloneArr(arr) {
  return Array.from(_toConsumableArray(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || []));
};
var omitRange = function omitRange(arr, startIndex, count) {
  var _validate = validate({
    arr: arr,
    startIndex: startIndex,
    count: count
  }, {
    arr: isArr,
    $default: isNonNegative
  }),
      _validate2 = _slicedToArray(_validate, 1),
      inputIsValid = _validate2[0];
  if (!inputIsValid) return arr;
  var nextArr = _toConsumableArray(arr);
  nextArr.splice(startIndex, count);
  return nextArr;
};
var flatMap = function flatMap(arr, mapFn) {
  var _validate3 = validate({
    arr: arr,
    mapFn: mapFn
  }, {
    arr: isArr,
    mapFn: isFunc
  }),
      _validate4 = _slicedToArray(_validate3, 1),
      inputIsValid = _validate4[0];
  if (!inputIsValid) return arr;
  return arr.reduce(function (finalArr, current) {
    var result = mapFn(current);
    isArr(result) ? result.map(function (el) {
      return finalArr.push(el);
    }) : finalArr.push(result);
    return finalArr;
  }, []);
};

export { randomizeArr as a, cloneArr as c, flatMap as f, isArr as i, omitRange as o, randomArr as r, uniqArr as u, validate as v };
