const fsPromiced = require("fs/promises");
const { getFilePathHtml, getFilePath } = require("../helpers/fsHelp.js");
const logger = require("../helpers/logger.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/home.ejs"), { pageTitle: "home" });
  logger.info("all right");
};

const getCssOrJs = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url))
    .catch((err) => {
      console.error(err);
    })
    .then((data) => {
      res.send(data);
    });
  logger.info("all right");
};

module.exports = { getHtml, getCssOrJs };
