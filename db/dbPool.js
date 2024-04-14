const Pool = require("pg").Pool;
const { makeWithPath } = require("../utils/fsHelp");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

let poolConfig;
if (DATABASE_URL) {
  poolConfig = { connectionString: DATABASE_URL };
} else {
  poolConfig = {
    host: process.env.PGHOST ?? "localhost",
    port: process.env.PG_PORT ?? 5432,
    password: process.env.PG_PASSWORD ?? "Node1",
    user: process.env.PG_USER ?? "postgres",
    database: process.env.PG_USERS_DBNAME ?? "users",
  };
}

const pool = new Pool(poolConfig);

module.exports = pool;
