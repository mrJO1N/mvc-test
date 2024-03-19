const _path = require("path");

const getFilePathHtml = (path) => _path.join(__dirname, "/../view", path);

const withPath = (pathStr) => _path.join(...pathStr.split("/"));

const getFilePath = (path) => _path.join(__dirname, "/../public", path);

module.exports = { getFilePathHtml, withPath, getFilePath };
