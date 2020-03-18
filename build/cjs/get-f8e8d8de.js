'use strict';

var updateColl = require('./updateColl-5bfa896d.js');

var get = function get(obj, path, fallback) {
  return updateColl.updateColl(obj, path, 'get', fallback);
};

exports.get = get;
