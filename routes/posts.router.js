const express = require("express");

const posts = require("../controllers/posts.controller.js");

const router = express.Router();

/* ----------main---------------- */

router.get("/api/posts/:id", posts.getOne);
router.get("/api/posts/range/:from/:to", posts.getSeveral);
router.post("/api/posts", posts.createOne);
router.patch("/api/posts/:id", posts.updateOne);
router.delete("/api/posts/:id", posts.deleteOne);

module.exports = router;
