/* config */
const express = require("express");
const posts = require("../controllers/posts.controller.js"),
  validator = require("../middlewares/validation/posts.validator.js");

const router = express.Router();

/* main */
router.get("/api/posts/:id", validator.get1, posts.getOne);
router.get("/api/posts/range/:from/:to", validator.get10, posts.getSeveral);

router.post("/api/posts", validator.post, posts.createOne);

router.patch("/api/posts/:id", validator.patch, posts.updateOne);
router.delete("/api/posts/:id", validator.delete, posts.deleteOne);

/* footer */
module.exports = router;
