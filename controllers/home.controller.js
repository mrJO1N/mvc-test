const fsPromiced = require("fs/promises");
const { getFilePathHtml, getFilePath } = require("../helpers/fsHelp.js"),
  { logAllRight, logger } = require("../helpers/logger.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/home.ejs"), { pageTitle: "home" });
  logAllRight();
};

const getOtherFile = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url))
    .catch((err) => {
      logger.error(404);
    })
    .then((data) => {
      res.send(data);
    });
  logAllRight();
};

const getCss = (req, res) => {
  fsPromiced
    .readFile(req.url, "utf-8")
    .catch((err) => {
      logger.error(404);
    })
    .then((data) => {
      res.contentType("text/css").header("Content-Type", "text/css").send(data);
    });
};

module.exports = { getHtml, getOtherFile, getCss };
