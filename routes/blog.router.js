/* config */
const express = require("express");
const { getFilePathHtml } = require("../helpers/fsHelp.js"),
  { logAllRight } = require("../helpers/logger.js");
const { getOtherFile, getCss } = require("../controllers/main.controller.js");

const router = express.Router();

/* main */
router.get("/blog", (req, res) => {
  res.render(getFilePathHtml("/blog.ejs"), { pageTitle: "blog" });
  logAllRight();
});
router.get("css/auth.css", getCss);
router.get("js/auth.js", getOtherFile);

/* footer */
module.exports = router;
