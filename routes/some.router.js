/* config */
const express = require("express");
const { getFilePathHtml } = require("../utils/fsHelp.js"),
  { logAllRight } = require("../utils/logger.js");

const router = express.Router();

/* main */
router.get("/some", (req, res) => {
  res.render(getFilePathHtml("/some.ejs"), { pageTitle: "some" });
  logAllRight();
});

/* footer */
module.exports = router;
