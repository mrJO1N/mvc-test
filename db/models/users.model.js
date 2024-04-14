/* config */
require("dotenv").config();

const db = require("../dbPool.js"),
  { logger, logAllRight } = require("../../utils/logger.js");

const DBNAME = "public." + (process.env.USERS_DBNAME ?? "users");

const sqlQuerys = {
  getUsers: (from, to) =>
    `SELECT * FROM ${DBNAME} ORDER BY id ASC LIMIT ${to || 1} ${
      from ? "OFFSET " + from : 0
    };`,

  getUser: (id) =>
    `SELECT * FROM ${DBNAME} WHERE id = ${id}
    ORDER BY id ASC;`,

  search: (username) =>
    `SELECT * FROM ${DBNAME} WHERE username = '${username}' ORDER BY username ASC;`,

  createUser: (username) =>
    `INSERT INTO ${DBNAME} (
       username) VALUES (
       '${username}'::character varying)
       returning id;`,

  deleteUser: (id) => `DELETE FROM ${DBNAME} WHERE (id=${id})`,

  updateUser: (id, newUsername) =>
    `UPDATE ${DBNAME} SET username='${newUsername}' WHERE id = ${id}`,
};

/* main */
class User {
  async getOne(req, res) {
    const { id } = req.params,
      { rows: users } = await db.query(sqlQuerys.getUser(id)).catch((err) => {
        logger.error("db: " + err);
      });

    res.json(users[0] ?? {});
    logAllRight();
  }
  async getRange(req, res) {
    const { from, to } = req.params;

    const { rows: users } = await db
      .query(sqlQuerys.getUsers(from, to))
      .catch((err) => {
        logger.error("db: " + err);
      });

    res.json(users);
    logAllRight();
  }

  async search(req, res) {
    const { username } = req.params,
      { rows: users } = await db
        .query(sqlQuerys.search(username))
        .catch((err) => {
          logger.error("db: " + err);
        });

    res.json(users[0] ?? {});
    logAllRight();
  }

  async createOne(req, res) {
    const { username } = req.body;

    const { rows: users } = await db
      .query(sqlQuerys.createUser(username))
      .catch((err) => {
        logger.error("db: " + err);
      });
    res.status(201).json(users[0]);
    logAllRight();
  }
  async updateOne(req, res) {
    const { id } = req.params;
    const { username: newUsername } = req.body;

    await db.query(sqlQuerys.updateUser(id, newUsername)).catch((err) => {
      logger.error("db: " + err);
    });

    res.json({});
    logAllRight();
  }
  async deleteOne(req, res) {
    const { id } = req.params;

    const { rowCount } = await db
      .query(sqlQuerys.deleteUser(id))
      .catch((err) => {
        logger.error("db: " + err);
      });

    if (rowCount === 0) {
      res.status(405).send();
      logger.warn("db: it has already been deleted");
    } else {
      res.status(200).json({});
      logAllRight();
    }
  }
}

/* footer */
module.exports = new User();
