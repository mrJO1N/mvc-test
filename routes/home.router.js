/* config */
const express = require("express");
const { getHtml } = require("../controllers/home.controller.js"),
  { getOtherFile, getCss } = require("../controllers/main.controller.js");

const router = express.Router();

/* main */
router.get(["/", "/home"], getHtml);
router.get(/.css/, getCss);
router.get([/ico/, /.js/], getOtherFile);

/* footer */
module.exports = router;
