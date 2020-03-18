'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-099800b1.js');
require('./isFunc-cafb7691.js');
require('./isObj-ffedee44.js');
var isNum = require('./isNum-e8ce2740.js');
var isBool = require('./isBool-102c91d0.js');
var isStr = require('./isStr-1e4ba1f4.js');
var isColl = require('./isColl-28b48873.js');
var reduceObj = require('./reduceObj-e1d83176.js');

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
          currentQueryItems[itemSplit[0]] = isArr.isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentQueryItems;
};

var objToQuery = function objToQuery(obj) {
  var firstSet;
  return reduceObj.reduceObj(obj, function (key, value, urlStr) {
    if (!value) return urlStr;
    var useVal = isStr.isStr(value) || isNum.isNum(value) || isBool.isBool(value) ? value : isColl.isColl(value) ? isArr.isArr(value) ? value.join(',') : JSON.stringify(value) : null;
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

exports.isValidUrl = isValidUrl;
exports.objToQuery = objToQuery;
exports.queryToObj = queryToObj;
