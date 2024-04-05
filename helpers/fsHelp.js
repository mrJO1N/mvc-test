/* config */
const _path = require("path");

/* main */
const getFilePathHtml = (path) => _path.join(__dirname, "/../view", path);

const makeWithPath = (pathStr) => _path.join(...pathStr.split("/"));

const getFilePath = (path) => _path.join(__dirname, "/../public", path);

/* footer */
module.exports = { getFilePathHtml, makeWithPath, getFilePath };
