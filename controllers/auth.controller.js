/* config */
const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  { logAllRight } = require("../helpers/logger.js");

/* main */
const getHtml = (req, res) => {
  res.render(getFilePathHtml("/auth.ejs"), { pageTitle: "authorization" });
  logAllRight();
};

/* footer */
module.exports = {
  getHtml,
};
