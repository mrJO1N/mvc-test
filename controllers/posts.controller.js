/* config */
require("dotenv").config();

const db = require("../model/dbPool.js"),
  { sendError } = require("./errors.controller.js"),
  { logger, logAllRight } = require("../helpers/logger.js");

const DBNAME = "public." + (process.env.POSTS_DBNAME ?? "posts");

const sqlQuerys = {
  getPosts: (from, to) =>
    `SELECT * FROM ${DBNAME} ORDER BY id ASC LIMIT ${to || 1} ${
      from ? "OFFSET " + from : 0
    };`,

  getPost: (id) => `SELECT * FROM ${DBNAME} WHERE id = ${id}
      ORDER BY id ASC;`,

  createPost: (title, content, userId) => `INSERT INTO ${DBNAME} (
         title, content, user_id) VALUES (
         '${title}'::character varying,
         '${content}'::text,
         '${userId}'::integer)
         returning id;`,

  deletePost: (id) => `DELETE FROM ${DBNAME} WHERE (id=${id})`,

  updatePost: (id, title, content) =>
    `UPDATE ${DBNAME} SET  title='${title}', content='${content}'  WHERE id = ${id} `,
};
/* main */
class Post {
  async getOne(req, res) {
    const { id } = req.params,
      { rows: posts } = await db.query(sqlQuerys.getPost(id)).catch((err) => {
        logger.error("db: " + err);
      });

    res.json(posts[0]);
    logAllRight();
  }
  async getSeveral(req, res) {
    const { from, to } = req.params,
      { rows: posts } = await db
        .query(sqlQuerys.getPosts(from, to))
        .catch((err) => {
          logger.error("db: " + err);
        });
    res.json(posts);
    logAllRight();
  }
  async createOne(req, res) {
    const { title, content, userId } = req.body;

    const { rows: posts } = await db
      .query(sqlQuerys.createPost(title, content, userId))
      .catch((err) => {
        logger.error("db: " + err);
      });

    res.json(posts[0]);
    logAllRight();
  }
  async updateOne(req, res) {
    const { id } = req.params,
      { title, content } = req.body;

    await db.query(sqlQuerys.updatePost(id, title, content)).catch((err) => {
      res.status(405).send();
      logger.error("db: " + err);
    });

    res.status(200).json({});
    logAllRight();
  }
  async deleteOne(req, res) {
    const { id } = req.params,
      { rowCount } = await db.query(sqlQuerys.deletePost(id)).catch((err) => {
        logger.error("db: " + err);
      });

    if (rowCount === 0) {
      sendError(req, res, 405);
      res.status(405).send();
      logger.warn("it has already been deleted");
    } else {
      res.status(200).json({});
      logAllRight();
    }
  }
}

/* footer */
module.exports = new Post();
