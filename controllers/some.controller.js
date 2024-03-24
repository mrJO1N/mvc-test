const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  usersModel = require("./users.controller.js"),
  { logger, logAllRight } = require("../helpers/logger.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/some.ejs"), { pageTitle: "some" });
  logAllRight();
};

module.exports = { getHtml };
