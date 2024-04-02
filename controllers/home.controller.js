const fsPromiced = require("fs/promises");
const { getFilePathHtml, getFilePath } = require("../helpers/fsHelp.js"),
  { logAllRight, logger } = require("../helpers/logger.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/home.ejs"), { pageTitle: "home" });
  logAllRight();
};

const getCss = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url), "utf-8")
    .catch((err) => {
      logger.error(404);
    })
    .then((data) => {
      res.type("text/css").send(data);
      logAllRight();
    });
};

module.exports = {
  getHtml,
  getOtherFile: require("./main.controller.js").getOtherFile,
  getCss,
};
