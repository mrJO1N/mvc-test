/* config */
const express = require("express");
const { getFilePathHtml } = require("../utils/fsHelp.js"),
  { logAllRight } = require("../utils/logger.js");
const { getOtherFile, getCss } = require("../controllers/main.controller.js");

const router = express.Router();

/* main */
router.get(["/", "/home"], (req, res) => {
  res.render(getFilePathHtml("/home.ejs"), { pageTitle: "home" });
  logAllRight();
});
router.get(/.css/, getCss);
router.get([/ico/, /.js/], getOtherFile);

/* footer */
module.exports = router;
