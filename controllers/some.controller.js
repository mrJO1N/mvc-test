/* config */
const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  { logAllRight } = require("../helpers/logger.js");

/* main */
const getHtml = (req, res) => {
  res.render(getFilePathHtml("/some.ejs"), { pageTitle: "some" });
  logAllRight();
};

/* footer */
module.exports = { getHtml };
