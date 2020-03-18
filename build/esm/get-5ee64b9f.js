import { u as updateColl } from './updateColl-4f0fb406.js';

var get = function get(obj, path, fallback) {
  return updateColl(obj, path, 'get', fallback);
};

export { get as g };
