const db = require("../model/db.js");

const { sendError } = require("./errors.controller.js");
const { logger, logAllRight } = require("../helpers/logger.js");
require("dotenv").config();

const DBNAME = "public." + (process.env.USERS_DBNAME ?? "users");

/*
usersJsonFromClient = {
  id: number,
  count: number, // count of responce data
  username: string
}
*/

const sqlQuerys = {
  getUsers(from, to) {
    return `SELECT * FROM ${DBNAME} ORDER BY id ASC LIMIT ${to || 1} ${
      from ? "OFFSET " + from : 0
    };`;
  },
  getUser(id) {
    return `SELECT * FROM ${DBNAME} WHERE id = ${id}
      ORDER BY id ASC;`;
  },
  createUser(username) {
    // return `INSERT INTO users VALUES (${username});`;
    return `INSERT INTO ${DBNAME} (
         username) VALUES (
         '${username}'::character varying)
         returning id;`;
  },
  deleteUser(id) {
    return `DELETE FROM ${DBNAME} WHERE (id=${id})`;
  },
  updateUser(id, newUsername) {
    return `UPDATE ${DBNAME} SET username='${newUsername}' WHERE id = ${id}`;
  },
};

class User {
  async createOne(req, res) {
    const { username } = req.body;

    if (!username) {
      res.status(400).send();
      return logger.error("not enough data");
    }

    const { rows: user } = await db
      .query(sqlQuerys.createUser(username))
      .catch((err) => {
        logger.error("db error");
      });
    res.send(user);
    logAllRight();
  }
  async getOne(req, res) {
    const { id } = req.params,
      { rows: user } = await db.query(sqlQuerys.getUser(id)).catch((err) => {
        logger.error("db error");
      });

    res.send(user);
    logAllRight();
  }
  async getSeveral(req, res) {
    const { from, to } = req.params,
      { rows: users } = await db
        .query(sqlQuerys.getUsers(from, to))
        .catch((err) => {
          logger.error("db error");
        });
    res.json(users);
    logAllRight();
  }
  async deleteOne(req, res) {
    const { id } = req.params,
      { rowCount } = await db.query(sqlQuerys.deleteUser(id)).catch((err) => {
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
      { username: newUsername } = req.body;

    const { rows } = await db
      .query(sqlQuerys.updateUser(id, newUsername))
      .catch((err) => {
        logger.error("db error");
      });

    res.send(rows);
    logAllRight();
  }
}

module.exports = new User();
