const express = require("express");
const {
  getHtml,
  getOtherFile,
  getCss,
} = require("../controllers/home.controller.js");

const router = express.Router();

router.get(["/", "/home"], getHtml);
router.get(/.css/, getCss);
router.get([/ico/, /.js/], getOtherFile);

module.exports = router;
