var typeOf = function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};

export { typeOf as t };
