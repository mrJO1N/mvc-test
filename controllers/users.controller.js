/* config */
require("dotenv").config();

const db = require("../model/dbPool.js"),
  { logger, logAllRight } = require("../helpers/logger.js");

const DBNAME = "public." + (process.env.USERS_DBNAME ?? "users");

/* main */
class User {
  async getOne(req, res) {
    const { id } = req.params,
      { rows: user } = await db
        .query(this.sqlQuerys.getUser(id))
        .catch((err) => {
          logger.error("db: " + err);
        });

    res.json(user);
    logAllRight();
  }
  async getSeveral(req, res) {
    const { from, to } = req.params;

    const { rows: users } = await db
      .query(this.sqlQuerys.getUsers(from, to))
      .catch((err) => {
        logger.error("db: " + err);
      });

    res.json(users);
    logAllRight();
  }
  async createOne(req, res) {
    const { username } = req.body;

    if (!username) {
      res.status(400).send();
      return logger.error("not enough data");
    }

    const { rows: user } = await db
      .query(this.sqlQuerys.createUser(username))
      .catch((err) => {
        logger.error("db: " + err);
      });
    res.json(user);
    logAllRight();
  }
  async updateOne(req, res) {
    const { id } = req.params;
    const { username: newUsername } = req.body;

    const { rows } = await db
      .query(this.sqlQuerys.updateUser(id, newUsername))
      .catch((err) => {
        logger.error("db: " + err);
      });

    res.send(rows);
    logAllRight();
  }
  async deleteOne(req, res) {
    const { id } = req.params;

    const { rowCount } = await db
      .query(this.sqlQuerys.deleteUser(id))
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
  constructor() {
    this.sqlQuerys = {
      getUsers: (from, to) =>
        `SELECT * FROM ${DBNAME} ORDER BY id ASC LIMIT ${to || 1} ${
          from ? "OFFSET " + from : 0
        };`,

      getUser: (id) =>
        `SELECT * FROM ${DBNAME} WHERE id = ${id}
        ORDER BY id ASC;`,

      createUser: (username) =>
        `INSERT INTO ${DBNAME} (
           username) VALUES (
           '${username}'::character varying)
           returning id;`,

      deleteUser: (id) => `DELETE FROM ${DBNAME} WHERE (id=${id})`,

      updateUser: (id, newUsername) =>
        `UPDATE ${DBNAME} SET username='${newUsername}' WHERE id = ${id}`,
    };
  }
}

/* footer */
module.exports = new User();
