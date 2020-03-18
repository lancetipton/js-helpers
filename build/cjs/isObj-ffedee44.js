'use strict';

var isFunc = require('./isFunc-cafb7691.js');

var isObj = function isObj(obj) {
  return isFunc._typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
};

exports.isObj = isObj;
