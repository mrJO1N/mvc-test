/* config */
const { logger } = require("../helpers/logger.js"),
  { getFilePathHtml } = require("../helpers/fsHelp.js");

/* main */
const sendErrorPage = (req, res, codeError) => {
  res.status(codeError).render(getFilePathHtml("/error.ejs"), {
    errorCode: codeError,
    pageTitle: "error",
  });
  logger.error(codeError);
};

/* footer */
module.exports = { sendErrorPage };
