import { e as _construct } from './isFunc-9054cb6e.js';

var cloneFunc = function cloneFunc(func) {
  var funcRef = func;
  var funcWrap = function funcWrap() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _construct(funcRef, args);
  };
  var funcClone = function funcClone() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return func instanceof funcClone ? funcWrap.apply(null, args) : funcRef.apply(func, args);
  };
  for (var key in func) {
    func.hasOwnProperty(key) && (funcClone[key] = func[key]);
  }
  Object.defineProperty(funcClone, 'name', {
    value: func.name,
    configurable: true
  });
  funcClone.toString = function () {
    return func.toString();
  };
  return funcClone;
};

export { cloneFunc as c };
