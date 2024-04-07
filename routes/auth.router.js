/* config */
const express = require("express");
const { getHtml } = require("../controllers/auth.controller.js"),
  { getOtherFile, getCss } = require("../controllers/main.controller.js");

const router = express.Router();

/* main */
router.get("/auth", getHtml);
router.get("css/auth.css", getCss);
router.get("js/auth.js", getOtherFile);

/* footer */
module.exports = router;
