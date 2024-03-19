const express = require("express");
const { getHtml, getCssOrJs } = require("../controllers/home.controller.js");

const router = express.Router();

router.get(["/", "/home"], getHtml);
router.get([/.css/, /.js/], getCssOrJs);

module.exports = router;
