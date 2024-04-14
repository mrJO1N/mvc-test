/* config */
const express = require("express");
const posts = require("../db/models/posts.model.js"),
  postsValid = require("../middlewares/validation/posts.valid.js"),
  mainValid = require("../middlewares/validation/main.valid.js");

const router = express.Router();

/* main */
router.get("/api/posts/:id", postsValid.getOne, posts.getOne);
router.get("/api/posts/range/:from/:to", postsValid.getRange, posts.getRange);

router.post(
  "/api/posts",
  mainValid.reqMustHaveBody,
  postsValid.post,
  posts.createOne
);

router.patch(
  "/api/posts/:id",
  mainValid.reqMustHaveBody,
  postsValid.patch,
  posts.updateOne
);
router.delete("/api/posts/:id", postsValid.delete, posts.deleteOne);

/* footer */
module.exports = router;
