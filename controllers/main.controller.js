const fsPromiced = require("fs/promises"),
  { logger, logAllRight } = require("../helpers/logger");

const { getFilePath } = require("../helpers/fsHelp");

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

module.exports = { getOtherFile };
