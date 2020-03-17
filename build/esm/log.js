import './es.array.concat-2cad827a.js';
import './es.array.index-of-41b8ca1a.js';

var SHOW_LOGS;
var METH_DEF = 'dir';
var PREFIX = 'type';
var LOG_TYPES = ['error', 'info', 'log', 'dir', 'warn'];
var setLogs = function setLogs(log, methDef, prefix) {
  SHOW_LOGS = log;
  METH_DEF = methDef || METH_DEF || 'log';
  PREFIX = prefix || PREFIX || 'type';
};
var resetLogs = function resetLogs() {
  SHOW_LOGS = undefined;
  METH_DEF = 'log';
  PREFIX = 'type';
};
var logData = function logData() {
  var _console, _console2;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (!args.length) return;
  var type = args.length === 1 ? METH_DEF : args.pop();
  if (!SHOW_LOGS && type !== 'error') return;else if (typeof args[0] === 'string') {
    if (PREFIX === 'type') args[0] = "[ ".concat(type.toUpperCase(), " ] ").concat(args[0]);else if (PREFIX) args[0] = "".concat(PREFIX, " ").concat(args[0]);
  }
  LOG_TYPES.indexOf(type) !== -1 ? (_console = console)[type].apply(_console, args) : (_console2 = console)[METH_DEF].apply(_console2, args.concat([type]));
};

export { logData, resetLogs, setLogs };
