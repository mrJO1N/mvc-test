const db = require("../model/pdb.js"),
  sqlQuerys = {
    getUsers(quantity) {
      return `SELECT * FROM public.users ORDER BY id ASC LIMIT ${
        quantity ?? 1
      };`;
    },
    getUser(id) {
      return `SELECT * FROM public.users WHERE id = ${id}
      ORDER BY id ASC;`;
    },
    createUser(username) {
      // return `INSERT INTO users VALUES (${username});`;
      return `INSERT INTO public.users (
        id, username) VALUES (
        '2'::integer, '${username}'::character varying)
         returning id;`;
    },
  };

class User {
  async createUser(req, res) {
    const username = req.body.username,
      { rows: user } = await db.query(sqlQuerys.getUser(username));
    res.send(user);
  }
  async getUser(req, res) {
    const id = req.params.id,
      { rows: user } = await db.query(sqlQuerys.getUser(id));

    res.send(user);
  }
  async getUsers(req, res) {
    const clientJson = req.body,
      { rows: users } = await db.query(sqlQuerys.getUsers(clientJson.quantity));
    res.json(users);
  }
  async deleteUser(req, res) {
    res.send("sql");
  }
  async updateUser(req, res) {
    res.send("sql");
  }
}

module.exports = new User();
