const express = require("express");
const { getHtml, getOtherFile } = require("../controllers/home.controller.js");

const router = express.Router();

router.get(["/", "/home"], getHtml);
router.get([/.css/, /.js/], getOtherFile);
router.get(/ico/, getOtherFile);

module.exports = router;
