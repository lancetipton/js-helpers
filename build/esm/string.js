import './isArr-3adaec3d.js';
import { i as isFunc } from './isFunc-9054cb6e.js';
import { i as isStr } from './isStr-90966827.js';
export { i as isStr } from './isStr-90966827.js';
import { t as toStr$1 } from './toStr-ff0731f8.js';
export { t as toStr } from './toStr-ff0731f8.js';
import { i as isColl } from './isColl-66968d37.js';
import './updateColl-4f0fb406.js';
import { g as get } from './get-5ee64b9f.js';
export { s as sanitize } from './sanitize-42a6d642.js';

var buildPath = function buildPath() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var built = args.reduce(function (path, arg) {
    var str = toStr(arg);
    return "".concat(path).concat(str && '/' + str || '');
  }, '');
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
};

var mapString = function mapString(str, charMapper) {
  if (!isStr(str)) return str;
  if (!isFunc(charMapper)) return str;
  var result = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;
  try {
    for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _char = _step.value;
      result += charMapper(_char);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return result;
};

var isLowerCase = function isLowerCase(str) {
  return str === str.toLowerCase();
};

var isUpperCase = function isUpperCase(str) {
  return str === str.toUpperCase();
};

var delimitString = function delimitString(str, delimiter) {
  var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['-', '_', ' '];
  if (!isStr(str)) return str;
  var isDelimiter = function isDelimiter(c) {
    return delimiters.some(function (del) {
      return del === c;
    });
  };
  var prevChar = '_';
  return mapString(str, function (_char) {
    if (isDelimiter(_char)) {
      prevChar = delimiter;
      return delimiter;
    }
    if (isUpperCase(_char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
      prevChar = _char;
      return delimiter + _char;
    }
    prevChar = _char;
    return _char;
  });
};

var snakeCase = function snakeCase(str) {
  var underscored = delimitString(str, '_');
  return underscored.toLowerCase();
};

var capitalize = function capitalize(str) {
  return isStr(str) && str[0] && "".concat(str[0].toUpperCase()).concat(str.slice(1).toLowerCase()) || str;
};

var removeDot = function removeDot(string) {
  var noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};

var cleanStr = function cleanStr(str) {
  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
};

var camelCase = function camelCase(str, compCase) {
  return str && cleanStr(str).split(/[\s_-]/gm).reduce(function (cased, word, index) {
    if (!word) return cased;
    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
    return cased;
  }, '') || str;
};

var containsStr = function containsStr(str, substring, fromIndex) {
  str = !isStr(str) && toStr$1(str) || str;
  substring = !isStr(substring) && toStr$1(substring) || substring;
  return str.indexOf(substring, fromIndex) !== -1;
};

var eitherStr = function eitherStr(str1, str2) {
  return isStr(str1) && str1 || str2;
};

var isEmail = function isEmail(str) {
  if (!str || !isStr(str)) return false;
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex.test(str));
};

var isPhone = function isPhone(str) {
  if (!str || !isStr(str)) return false;
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
};

var isUrl = function isUrl(str) {
  var regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex.test(str));
};

var isUuid = function isUuid(str) {
  if (!str || !isStr(str)) return false;
  var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return Boolean(regex.test(str));
};

var parseJSON = function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

var plural = function plural(str) {
  if (!str || !str.length) return str;
  return str[str.length - 1] !== 's' ? str + 's' : str;
};

var singular = function singular(str) {
  if (!str || !str.length) return str;
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
};

var styleCase = function styleCase(str) {
  if (!isStr(str)) return str;
  var cased = camelCase(str);
  return "".concat(cased[0].toLowerCase()).concat(cased.slice(1));
};

var trainCase = function trainCase(str) {
  return isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;
};

var wordCaps = function wordCaps(str) {
  if (!isStr(str)) return str;
  var cleaned = cleanStr(str);
  return cleaned.split(' ').map(function (word) {
    return word && capitalize(word) || '';
  }).join(' ');
};

var template = function template(_template, data) {
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  data = isColl(data) && data || {};
  return isStr(_template) && _template.replace(/\${([^{]+[^}])}/g, function (match) {
    var path = match.substr(2, match.length - 3).trim();
    var replaceWith = get(data, path, fallback);
    return isFunc(replaceWith) ? replaceWith(data, path, fallback) : replaceWith;
  }) || _template;
};

export { buildPath, camelCase, capitalize, cleanStr, containsStr, delimitString, eitherStr, isEmail, isLowerCase, isPhone, isUpperCase, isUrl, isUuid, mapString, parseJSON, plural, removeDot, singular, snakeCase, styleCase, template, trainCase, wordCaps };
