const express = require("express");
const { getHtml, getCssOrJs, getError404 } = require("../controllers/home.js");

const router = express.Router();

router.get(["/", "/home"], getHtml);
router.get([/.css/, /.js/], getCssOrJs);
router.get("*", getError404);

module.exports = router;
