const db = require("../model/db.js");

const { sendError } = require("./errors.controller.js");
const { logger, logAllRight } = require("../helpers/logger.js");
require("dotenv").config();

const DBNAME = "public." + (process.env.POSTS_DBNAME ?? "posts");

/*
postsJsonFromClient = {
  id: number,
  title: string
  text: string
  userId: number
}
*/

const sqlQuerys = {
  getPosts(from, to) {
    return `SELECT * FROM ${DBNAME} ORDER BY id ASC LIMIT ${to || 1} ${
      from ? "OFFSET " + from : 0
    };`;
  },
  getPost(id) {
    return `SELECT * FROM ${DBNAME} WHERE id = ${id}
      ORDER BY id ASC;`;
  },
  createPost(title, content, userId) {
    return `INSERT INTO ${DBNAME} (
         title, content, user_id) VALUES (
         '${title}'::character varying,
         '${content}'::text,
         '${userId}'::integer)
         returning id;`;
  },
  deletePost(id) {
    return `DELETE FROM ${DBNAME} WHERE (id=${id})`;
  },
  updatePost(id, title, content) {
    return `UPDATE ${DBNAME} SET  title='${title}', content='${content}'  WHERE id = ${id} `;
  },
};

class Post {
  async createOne(req, res) {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      res.status(400).send();
      logger.error("not enough data");
      return;
    }

    const { rows: post } = await db
      .query(sqlQuerys.createPost(title, content, userId))
      .catch((err) => {
        logger.error("db error" + err);
      });
    res.send(post);
    logAllRight();
  }
  async getOne(req, res) {
    const { id } = req.params,
      { rows: user } = await db.query(sqlQuerys.getPost(id)).catch((err) => {
        logger.error("db error");
      });

    res.send(user);
    logAllRight();
  }
  async getSeveral(req, res) {
    const { from, to } = req.params,
      { rows: posts } = await db
        .query(sqlQuerys.getPosts(from, to))
        .catch((err) => {
          logger.error("db error");
        });
    res.json(posts);
    logAllRight();
  }
  async deleteOne(req, res) {
    const { id } = req.params,
      { rowCount } = await db.query(sqlQuerys.deletePost(id)).catch((err) => {
        logger.error("db error");
      });

    if (rowCount === 0) {
      sendError(req, res, 405);
      logger.warn("it has already been deleted");
    } else {
      res.status(200).json({});
      logAllRight();
    }
  }
  async updateOne(req, res) {
    const { id } = req.params,
      { title, content } = req.body;

    await db.query(sqlQuerys.updatePost(id, title, content)).catch((err) => {
      logger.error("db error");
    });

    res.status(200).json({});
    logAllRight();
  }
}

module.exports = new Post();
