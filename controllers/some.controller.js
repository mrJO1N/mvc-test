const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  usersModel = require("./users.controller.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/some.ejs"), { pageTitle: "some" });
};

module.exports = { getHtml };
