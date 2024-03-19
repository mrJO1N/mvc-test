const express = require("express");

const { getHtml } = require("../controllers/some.js");

const router = express.Router();

/* ----------main---------------- */

router.get("/some", getHtml);

module.exports = router;
