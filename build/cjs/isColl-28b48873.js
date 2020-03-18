'use strict';

var isFunc = require('./isFunc-cafb7691.js');

var isColl = function isColl(val) {
  return isFunc._typeof(val) === 'object' && val !== null;
};

exports.isColl = isColl;
