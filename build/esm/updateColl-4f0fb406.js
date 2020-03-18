import { i as isArr } from './isArr-3adaec3d.js';
import { d as _typeof, i as isFunc } from './isFunc-9054cb6e.js';
import { i as isColl } from './isColl-66968d37.js';

var updateColl = function updateColl(obj, path, type, val) {
  var org = obj;
  if (!isColl(obj) || !obj || !path) return type !== 'set' && val || undefined;
  var parts = isArr(path) ? Array.from(path) : path.split('.');
  var key = parts.pop();
  var prop;
  var breakPath;
  var _loop = function _loop() {
    var next = obj[prop];
    isColl(next) || isFunc(next) ? obj = next : function () {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = next;
    }();
    if (breakPath) return {
      v: val
    };
  };
  while (prop = parts.shift()) {
    var _ret = _loop();
    if (_typeof(_ret) === "object") return _ret.v;
  }
  return type === 'get'
  ? key in obj ? obj[key] : val : type === 'unset'
  ? delete obj[key] :
  (obj[key] = val) && org || org;
};

export { updateColl as u };
