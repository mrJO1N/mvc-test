const _path = require("path");
const getFilePath = (path) => {
  return _path.join(__dirname, "/../view", path);
};

module.exports = { getFilePath };
