/* config */
require("dotenv").config();
const { transports, format, createLogger } = require("winston");
const { makeWithPath } = require("../helpers/fsHelp");

const PATH_TO_LOGS =
  process.env.PATH_TO_LOGS ?? makeWithPath(__dirname + "/../logs/l.log");

const logger = createLogger({
  format: format.combine(format.simple()),
  transports: [
    // new transports.File({ filename: PATH_TO_LOGS, level: "info" }),
    new transports.Console(),
  ],
  level: "debug",
});

/* main */
const logAllRight = () => logger.info(`${getTimeStr()} ===== 200 ===== `);

const setDigitsCount = (count, num) => {
  if (isNaN(Number(count)) || isNaN(Number(num))) return "0";

  const numStr = String(Math.abs(num)).replace(".", "");

  if (numStr.length > count) {
    return "0".repeat(count);
  } else {
    return ["0".repeat(count - numStr.length), ...numStr].join("");
  }
};

const getTimeStr = () => {
  const date = new Date();

  const dateArr = [
      date.getFullYear(),
      setDigitsCount(2, date.getMonth() + 1),
      setDigitsCount(2, date.getDate()),
    ],
    hourArr = [
      setDigitsCount(2, date.getHours()),
      setDigitsCount(2, date.getMinutes()),
      setDigitsCount(2, date.getSeconds()),
      setDigitsCount(3, date.getMilliseconds()),
    ];

  return "[" + dateArr.join(".") + " " + hourArr.join(":") + "] ";
};

/* footer */
module.exports = { logger, logAllRight, getTimeStr, setDigitsCount };
