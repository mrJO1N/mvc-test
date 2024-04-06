/* config */
const express = require("express");
const users = require("../controllers/users.controller.js"),
  validator = require("../middlewares/validation/users.validator.js");

const router = express.Router();

/* main */
router.get("/api/users/:id", validator.get1, users.getOne);
router.get("/api/users/range/:from/:to", validator.get10, users.getSeveral);

router.post(
  "/api/users",
  validator.reqMustHaveBody,
  validator.post,
  users.createOne
);

router.patch(
  "/api/users/:id",
  validator.reqMustHaveBody,
  validator.patch,
  users.updateOne
);
router.delete("/api/users/:id", validator.delete, users.deleteOne);

/* footer */
module.exports = router;
