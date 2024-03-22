const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  usersModel = require("./users.controller.js"),
  logger = require("../helpers/logger.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/some.ejs"), { pageTitle: "some" });
  logger.info("all right");
};

module.exports = { getHtml };
