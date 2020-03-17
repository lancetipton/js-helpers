import { r as requireObjectCoercible, d as anObject, a as toLength, c as toInteger, t as toObject, e as arrayMethodHasSpeciesSupport, f as arrayMethodUsesToLength, w as wellKnownSymbol, $, C as toIndexedObject, i as toAbsoluteIndex, O as isArray, A as isObject, j as createProperty, h as arrayMethodIsStrict, g as fails } from './es.array.concat-2cad827a.js';
import { A as ArrayIterationModule } from './species-constructor-e56845e3.js';
import './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import { f as fixRegExpWellKnownSymbolLogic, c as callRegExpExec, a as advanceStringIndex } from './es.string.split-3996f72b.js';
import { isFunc } from './method.js';
import { isColl, get } from './collection.js';

var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};
var stringTrim = {
  start: createMethod(1),
  end: createMethod(2),
  trim: createMethod(3)
};

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
  return [
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }
      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = callRegExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default:
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });
var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var $some = ArrayIterationModule.some;
var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('some');
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH$1 }, {
  some: function some(callbackfn ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var non = '\u200B\u0085\u180E';
var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim;
$({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

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
var snakeCase = function snakeCase(str) {
  var underscored = delimitString(str, '_');
  return underscored.toLowerCase();
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
var mapString = function mapString(str, charMapper) {
  if (!isStr(str)) return str;
  if (!isFunc(charMapper)) return str;
  var result = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;
  try {
    for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _char2 = _step.value;
      result += charMapper(_char2);
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
var camelCase = function camelCase(str, compCase) {
  return str && cleanStr(str).split(/[\s_-]/gm).reduce(function (cased, word, index) {
    if (!word) return cased;
    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
    return cased;
  }, '') || str;
};
var cleanStr = function cleanStr(str) {
  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
};
var capitalize = function capitalize(str) {
  return isStr(str) && str[0] && "".concat(str[0].toUpperCase()).concat(str.slice(1).toLowerCase()) || str;
};
var containsStr = function containsStr(str, substring, fromIndex) {
  str = !isStr(str) && toStr(str) || str;
  substring = !isStr(substring) && toStr(substring) || substring;
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
var isStr = function isStr(str) {
  return typeof str === 'string';
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
var removeDot = function removeDot(string) {
  var noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};
var sanitize = function sanitize(str) {
  return isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
};
var singular = function singular(str) {
  if (!str || !str.length) return str;
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
};
var styleCase = function styleCase(str) {
  if (!isStr) return str;
  var cased = camelCase(str);
  return "".concat(cased[0].toLowerCase()).concat(cased.slice(1));
};
var trainCase = function trainCase(str) {
  return isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;
};
var toStr = function toStr(val) {
  return val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);
};
var wordCaps = function wordCaps(str) {
  if (!str) return str;
  var cleaned = cleanStr(str);
  return cleaned.split(' ').map(function (word) {
    return word && capitalize(word) || '';
  }).join(' ');
};
var isUpperCase = function isUpperCase(str) {
  return str === str.toUpperCase();
};
var isLowerCase = function isLowerCase(str) {
  return str === str.toLowerCase();
};
var template = function template(_template, data) {
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  data = isColl(data) && data || {};
  return isStr(_template) && _template.replace(/\${([^{]+[^}])}/g, function (match) {
    var path = match.substr(2, match.length - 3).trim();
    return get(data, path, fallback);
  }) || _template;
};

export { isLowerCase as A, template as B, snakeCase as a, buildPath as b, camelCase as c, delimitString as d, cleanStr as e, capitalize as f, containsStr as g, eitherStr as h, isStr as i, isEmail as j, isPhone as k, isUrl as l, mapString as m, isUuid as n, plural as o, parseJSON as p, removeDot as q, stringTrim as r, sanitize as s, toStr as t, singular as u, styleCase as v, whitespaces as w, trainCase as x, wordCaps as y, isUpperCase as z };
