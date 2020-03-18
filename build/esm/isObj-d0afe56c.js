import { d as _typeof } from './isFunc-9054cb6e.js';

var isObj = function isObj(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
};

export { isObj as i };
