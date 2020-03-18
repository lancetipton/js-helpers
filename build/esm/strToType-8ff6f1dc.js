import { i as isNum } from './isNum-c9e7e2d6.js';
import { i as isStrBool, t as toBool } from './toBool-efea676b.js';
import { i as isStr } from './isStr-90966827.js';
import { t as toNum } from './toNum-d3e6ee15.js';

var strToType = function strToType(val) {
  return !val || !isStr(val) ? val : isStrBool(val) ? toBool(val) : isNum(val) ? toNum(val) : function () {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }();
};

export { strToType as s };
