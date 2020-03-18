import { i as isStr } from './isStr-90966827.js';

var toStr = function toStr(val) {
  return val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);
};

export { toStr as t };
