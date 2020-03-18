'use strict';

var isArr = require('./isArr-099800b1.js');
var isFunc = require('./isFunc-cafb7691.js');
var isObj = require('./isObj-ffedee44.js');
var isNonNegative = require('./isNonNegative-e4e43dcb.js');

var randomArr = function randomArr(arr, amount) {
  if (!isArr.isArr(arr)) return arr;
  var useAmount = amount || 1;
  var randoms = [];
  for (var i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return !amount ? randoms[0] : randoms;
};

var randomizeArr = function randomizeArr(arr) {
  return !isArr.isArr(arr) && arr || arr.sort(function () {
    return 0.5 - Math.random();
  });
};

var uniqArr = function uniqArr(arr) {
  return !isArr.isArr(arr) && arr || arr.filter(function (e, i, arr) {
    return arr.indexOf(e) == i;
  });
};

var cloneArr = function cloneArr(arr) {
  return Array.from(isFunc._toConsumableArray(isArr.isArr(arr) && arr || isObj.isObj(arr) && Object.entries(arr) || []));
};

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
    var _ref3 = isFunc._slicedToArray(_ref2, 2),
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
    cases: isFunc._objectSpread2({}, finalResult.cases, isFunc._defineProperty({}, nextValidation.key, nextValidation))
  };
};
var handleFailure = function handleFailure(validation, shouldLog, shouldThrow, prefix) {
  var _console;
  var reason = prefix ? [prefix].concat(isFunc._toConsumableArray(validation.reason)) : validation.reason;
  if (shouldThrow) throw new Error(reason.join());
  if (shouldLog) (_console = console).error.apply(_console, isFunc._toConsumableArray(reason));
};

var omitRange = function omitRange(arr, startIndex, count) {
  var _validate = validate({
    arr: arr,
    startIndex: startIndex,
    count: count
  }, {
    arr: isArr.isArr,
    $default: isNonNegative.isNonNegative
  }),
      _validate2 = isFunc._slicedToArray(_validate, 1),
      inputIsValid = _validate2[0];
  if (!inputIsValid) return arr;
  var nextArr = isFunc._toConsumableArray(arr);
  nextArr.splice(startIndex, count);
  return nextArr;
};

var flatMap = function flatMap(arr, mapFn) {
  var _validate = validate({
    arr: arr,
    mapFn: mapFn
  }, {
    arr: isArr.isArr,
    mapFn: isFunc.isFunc
  }),
      _validate2 = isFunc._slicedToArray(_validate, 1),
      inputIsValid = _validate2[0];
  if (!inputIsValid) return arr;
  return arr.reduce(function (finalArr, current) {
    var result = mapFn(current);
    isArr.isArr(result) ? result.map(function (el) {
      return finalArr.push(el);
    }) : finalArr.push(result);
    return finalArr;
  }, []);
};

exports.isArr = isArr.isArr;
exports.cloneArr = cloneArr;
exports.flatMap = flatMap;
exports.omitRange = omitRange;
exports.randomArr = randomArr;
exports.randomizeArr = randomizeArr;
exports.uniqArr = uniqArr;
exports.validate = validate;
