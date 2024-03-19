const dotenv = require("dotenv"),
  Sequelize = require("sequelize");
dotenv.config({ path: "../" });

const HOSTNAME = process.env.HOSTNAME ?? "localhost";

module.exports = new Sequelize("proglib", "postgres", "secret", {
  host: HOSTNAME,
  dialect: "postgres",

  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});
