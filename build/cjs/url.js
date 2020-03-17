'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./es.array.concat-207a854d.js');
require('./species-constructor-736ba485.js');
var array = require('./array-411f3373.js');
require('./es.object.get-prototype-of-38cc319f.js');
require('./web.dom-collections.iterator-a6008c5a.js');
require('./es.array.index-of-043c7818.js');
var object = require('./object-38f445e5.js');
require('./es.string.split-893ff521.js');
var number = require('./number-a23c768f.js');
var string = require('./string-70ad3fa2.js');
require('./method.js');
require('./web.timers-37faa3ac.js');
require('./es.object.get-own-property-names-7a04c850.js');
require('./log.js');
var collection = require('./collection.js');
var boolean = require('./boolean.js');
require('./ext.js');

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
      var array$1 = decodeURIComponent(itemSplit[1]).split(',');
      if (array$1 && array$1.length > 1) currentQueryItems[itemSplit[0]] = array$1;
      else if (itemSplit[0] in currentQueryItems) {
          var val = currentQueryItems[itemSplit[0]];
          currentQueryItems[itemSplit[0]] = array.isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentQueryItems;
};
var objToQuery = function objToQuery(obj) {
  var firstSet;
  return object.reduceObj(obj, function (key, value, urlStr) {
    if (!value) return urlStr;
    var useVal = string.isStr(value) || number.isNum(value) || boolean.isBool(value) ? value : collection.isColl(value) ? array.isArr(value) ? value.join(',') : JSON.stringify(value) : null;
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
