/* config */
const express = require("express");
const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  { logAllRight } = require("../helpers/logger.js");

const router = express.Router();

/* main */
router.get("/some", (req, res) => {
  res.render(getFilePathHtml("/some.ejs"), { pageTitle: "some" });
  logAllRight();
});

/* footer */
module.exports = router;
