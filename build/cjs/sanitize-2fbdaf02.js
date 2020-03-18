'use strict';

var isStr = require('./isStr-1e4ba1f4.js');

var sanitize = function sanitize(str) {
  return isStr.isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
};

exports.sanitize = sanitize;
