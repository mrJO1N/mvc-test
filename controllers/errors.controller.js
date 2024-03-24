const sendErrorPage = (req, res, codeError) => {
  res.status(codeError).render(getFilePathHtml("/error.ejs"), {
    errorCode: codeError,
    pageTitle: "error",
  });
  logger.error(codeError.toString());
};

const sendError = (req, res, httpErrorCode) => {
  res.status(httpErrorCode).json({ status: "error" });
};

module.exports = { sendErrorPage, sendError };