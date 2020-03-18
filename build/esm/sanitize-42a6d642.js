import { i as isStr } from './isStr-90966827.js';

var sanitize = function sanitize(str) {
  return isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
};

export { sanitize as s };
