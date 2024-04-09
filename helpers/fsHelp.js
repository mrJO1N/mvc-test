/* config */
const _path = require("path");

/* main */
/**
 * @param {string} path
 * @returns {string} absolute path to html file
 */
const getFilePathHtml = (path) => _path.join(__dirname, "/../view", path);

/**
 * @param {string} pathStr
 * @returns {string} "node:path" path to file/directory
 *
 * example: makeWithPath("public" + "/index.html") -> "C:\\...\public\\index.html"
 */
const makeWithPath = (pathStr) => _path.join(...pathStr.split("/"));

/**
 * @param {string} path
 * @returns {string} absolute path to file, but not html
 *
 * for html files use getFilePathHtml()
 */
const getFilePath = (path) => _path.join(__dirname, "/../public", path);

/* footer */
module.exports = { getFilePathHtml, makeWithPath, getFilePath };
