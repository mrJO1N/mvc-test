const { transports, format, createLogger } = require("winston");
require("dotenv").config({ path: "../" });

const { withPath } = require("./fsHelp");

const PATH_TO_LOGS =
  process.env.PATH_TO_LOGS ?? withPath(__dirname + "/../logs/l.log");

const logger = createLogger({
  format: format.combine(format.simple()),
  transports: [
    new transports.File({ filename: PATH_TO_LOGS, level: "info" }),
    new transports.Console(),
  ],
  level: "debug",
});

const logAllRight = () => {
  logger.info("all right");
};
module.exports = { logger, logAllRight };
