/* config */
const express = require("express");
const users = require("../controllers/users.controller.js");

const router = express.Router();

/* main */
router.get("/api/users/:id", users.getOne);
router.get("/api/users/range/:from/:to", users.getSeveral);

router.post("/api/users", users.createOne);

router.patch("/api/users/:id", users.updateOne);
router.delete("/api/users/:id", users.deleteOne);

/* footer */
module.exports = router;
