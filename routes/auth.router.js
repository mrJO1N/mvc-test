/* config */
const express = require("express");
const { logAllRight } = require("../utils/logger.js"),
  { getFilePathHtml } = require("../utils/fsHelp.js");
const { getOtherFile, getCss } = require("../controllers/main.controller.js");

const router = express.Router();

/* main */
router.get("/auth", (req, res) => {
  res.render(getFilePathHtml("/auth.ejs"), { pageTitle: "authorization" });
  logAllRight();
});
router.get("css/auth.css", getCss);
router.get("js/auth.js", getOtherFile);

/* footer */
module.exports = router;
