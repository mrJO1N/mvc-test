/* config */
const express = require("express");
const { getHtml } = require("../controllers/some.controller.js");

const router = express.Router();

/* main */
router.get("/some", getHtml);

/* footer */
module.exports = router;
