const testIsNum = (num) => {
  if (Number(num) === NaN) return false;
  return true;
};

module.exports = { testIsNum };
