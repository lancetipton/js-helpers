"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logData = exports.reset = exports.setLogs = void 0;
var SHOW_LOGS;
var METH_DEF = 'dir';
var PREFIX = 'type';
var LOG_TYPES = ['error', 'info', 'log', 'dir', 'warn'];
var isTest = process.env.NODE_ENV === 'test';
/**
 * Turns logs on || off
 * Set the default log method
 * Add a prefix to all log message
 * @param  { boolean } log - log values
 * @param  { string } methDef - default log method
 * @param  { string } prefix - string to add to all logs
 * @return { void }
 */

var setLogs = function setLogs(log, methDef, prefix) {
  SHOW_LOGS = log;
  METH_DEF = methDef || METH_DEF || 'dir';
  PREFIX = prefix || PREFIX || 'type';
};

exports.setLogs = setLogs;

var reset = function reset() {
  SHOW_LOGS = undefined;
  METH_DEF = 'dir';
  PREFIX = 'type';
};
/**
 * Logs a string to the inspector, uses the last argument to determine the log type
 * @param  { array } args - to be passed to the log call
 * @return { void }
 */


exports.reset = reset;

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
  LOG_TYPES.indexOf(type) !== -1 ? (_console = console)[type].apply(_console, args) : (_console2 = console).dir.apply(_console2, args.concat([type]));
};

exports.logData = logData;
isTest && (module.exports.getShowLogs = function () {
  return SHOW_LOGS;
});