/* config */
const express = require("express");
const users = require("../db/models/users.model.js"),
  usersValid = require("../middlewares/validation/users.valid.js"),
  mainValid = require("../middlewares/validation/main.valid.js");

const router = express.Router();

/* main */
router.get("/api/users/:id", usersValid.getOne, users.getOne);
router.get("/api/users/range/:from/:to", usersValid.getRange, users.getRange);
router.get("/api/users/search/:username", usersValid.search, users.search);

router.post(
  "/api/users",
  mainValid.reqMustHaveBody,
  usersValid.post,
  users.createOne
);

router.patch(
  "/api/users/:id",
  mainValid.reqMustHaveBody,
  usersValid.patch,
  users.updateOne
);
router.delete("/api/users/:id", usersValid.delete, users.deleteOne);

/* footer */
module.exports = router;
