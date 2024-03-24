/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv");

const {
    withPath,
    getFilePath,
    getFilePathHtml,
  } = require("./helpers/fsHelp.js"),
  { logger } = require("./helpers/logger.js");

const homeRouter = require("./routes/home.router.js"),
  someRouter = require("./routes/some.router.js"),
  usersRouter = require("./routes/users.router.js");
const {
  sendError,
  sendErrorPage,
} = require("./controllers/errors.controller.js");

const app = express();
app.disable("etag");
app
  .use(express.static(withPath(__dirname + "/public")))
  .set("views", withPath(__dirname + "/view"))
  .set("view engine", "ejs");

dotenv.config();

const PORT = process.env.PORT ?? 80;

/* ----------- main ------------------ */
app.use((req, res, next) => {
  logger.info(`new request: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(homeRouter, someRouter, usersRouter);

app.use((req, res) => {
  sendErrorPage(req, res, 404);
});
app.listen(PORT, () =>
  logger.info(
    `run on ${PORT} port. http://localhost${PORT !== 80 ? ":" + PORT : ""}/`
  )
);
