const Pool = require("pg").Pool,
  dotenv = require("dotenv");
dotenv.config({ path: "../" });

const pool = new Pool({
  host: process.env.HOSTNAME ?? "localhost",
  port: process.env.DB_PORT ?? 5432,
  password: process.env.DB_PASS ?? "Node1",
  user: process.env.DB_USER ?? "postgres",
  database: "users",
});

module.exports = pool;
