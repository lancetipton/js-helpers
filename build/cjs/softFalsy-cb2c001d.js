'use strict';

var softFalsy = function softFalsy(val) {
  return Boolean(val || val === '' || val === 0);
};

exports.softFalsy = softFalsy;
