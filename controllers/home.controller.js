const fsPromiced = require("fs/promises");
const { getFilePathHtml, getFilePath } = require("../helpers/fsHelp.js"),
  { logger, logAllRight } = require("../helpers/logger.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/home.ejs"), { pageTitle: "home" });
  logAllRight();
};

const getOtherFile = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url))
    .catch((err) => {
      console.error(err);
    })
    .then((data) => {
      res.send(data);
    });
  logAllRight();
};

module.exports = { getHtml, getOtherFile };
