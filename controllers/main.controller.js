/* config */
const fsPromiced = require("fs/promises"),
  { logger, logAllRight } = require("../utils/logger");

const { getFilePath } = require("../utils/fsHelp");

/* main */
const getCss = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url), "utf-8")
    .catch((err) => {
      res.status(404).send();
      logger.error(404);
    })
    .then((data) => {
      res.type("css").send(data);
      logAllRight();
    });
};

const getOtherFile = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url))
    .catch((err) => {
      res.status(404).send();
      logger.error(404);
    })
    .then((data) => {
      res.send(data);
      logAllRight();
    });
};

/* footer */
module.exports = { getOtherFile, getCss };
