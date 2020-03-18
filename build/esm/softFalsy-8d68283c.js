var softFalsy = function softFalsy(val) {
  return Boolean(val || val === '' || val === 0);
};

export { softFalsy as s };
