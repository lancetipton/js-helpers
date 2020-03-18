import { i as isArr } from './isArr-3adaec3d.js';
import './isFunc-9054cb6e.js';
import './isObj-d0afe56c.js';
import { i as isNum } from './isNum-c9e7e2d6.js';
import { i as isBool } from './isBool-f1457797.js';
import { i as isStr } from './isStr-90966827.js';
import { i as isColl } from './isColl-66968d37.js';
import { r as reduceObj } from './reduceObj-ce655425.js';

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
