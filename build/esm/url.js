import './es.array.concat-2cad827a.js';
import './species-constructor-e56845e3.js';
import { i as isArr } from './array-ee263a8a.js';
import './es.object.get-prototype-of-95b6b85b.js';
import './web.dom-collections.iterator-ec5cce15.js';
import './es.array.index-of-41b8ca1a.js';
import { s as reduceObj } from './object-f4dd8b1b.js';
import './es.string.split-3996f72b.js';
import { a as isNum } from './number-115728d2.js';
import { i as isStr } from './string-0069576a.js';
import './method.js';
import './web.timers-4a3cb5af.js';
import './es.object.get-own-property-names-e3b24cf9.js';
import './log.js';
import { isColl } from './collection.js';
import { isBool } from './boolean.js';
import './ext.js';

var queryToObj = function queryToObj(string) {
  var currentQueryItems = {};
  var stringSplit = string.split('?');
  var querystring = stringSplit[stringSplit.length - 1];
  if (!querystring) return currentQueryItems;
  var split = querystring.split('&');
  split.length && split.map(function (item) {
    var components = item.split('=');
    if (components.length <= 1) return currentQueryItems;
    var itemSplit = [components.shift(), components.join('=')];
    if (itemSplit.length === 2) {
      var array = decodeURIComponent(itemSplit[1]).split(',');
      if (array && array.length > 1) currentQueryItems[itemSplit[0]] = array;
      else if (itemSplit[0] in currentQueryItems) {
          var val = currentQueryItems[itemSplit[0]];
          currentQueryItems[itemSplit[0]] = isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentQueryItems;
};
var objToQuery = function objToQuery(obj) {
  var firstSet;
  return reduceObj(obj, function (key, value, urlStr) {
    if (!value) return urlStr;
    var useVal = isStr(value) || isNum(value) || isBool(value) ? value : isColl(value) ? isArr(value) ? value.join(',') : JSON.stringify(value) : null;
    if (!useVal) return urlStr;
    urlStr = !firstSet ? "?".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal)) : "".concat(urlStr, "&").concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal));
    firstSet = true;
    return urlStr;
  }, '');
};
var isValidUrl = function isValidUrl(string) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regexp.test(string);
};

export { isValidUrl, objToQuery, queryToObj };
