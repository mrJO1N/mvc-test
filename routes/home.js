const express = require("express");
const { getHome } = require("../controllers/home.js");

const router = express.Router();

router.get(["/", "/home"], getHome);

module.exports = router;
