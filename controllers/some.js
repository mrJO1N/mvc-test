const { getFilePath } = require("../helpers/fsHelp.js"),
  usersModel = require("../model/users.js");

const getHtml = (req, res) => {
  res.render(getFilePath("/some/index.ejs"), { pageTitle: "some" });
};

module.exports = { getHtml };
