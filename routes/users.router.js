const express = require("express");

const users = require("../controllers/users.controller.js");

const router = express.Router();

/* ----------main---------------- */

router.get("/users/:id", users.getUser);
router.get("/users", users.getUsers);
router.post("/users", users.createUser);
router.patch("/users/:id", users.updateUser);
router.delete("/users/get/", users.deleteUser);

module.exports = router;
