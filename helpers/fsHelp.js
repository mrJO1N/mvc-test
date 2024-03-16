const _path = require("path");
const getFilePath = (path) => {
  return _path.join(__dirname, "/../view", path);
};
const withPath = (pathStr) => {
  return _path.join(...pathStr.split("/"));
};

module.exports = { getFilePath, withPath };
