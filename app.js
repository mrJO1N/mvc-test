/* config */
const express = require("express"),
  dotenv = require("dotenv"),
  fsPromiced = require("fs/promises");

const { withPath } = require("./helpers/fsHelp.js"),
  { logger, getTimeStr } = require("./helpers/logger.js");

const homeRouter = require("./routes/home.router.js"),
  someRouter = require("./routes/some.router.js");
const usersRouter = require("./routes/users.router.js"),
  postsRouter = require("./routes/posts.router.js");
const { sendErrorPage } = require("./controllers/errors.controller.js");

const app = express();
app.disable("etag"); // non browser caching
app
  .use(express.static(withPath(__dirname + "/public")))
  .set("views", withPath(__dirname + "/view"))
  .set("view engine", "ejs");
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT ?? 80;

/* log */
app.use((req, res, next) => {
  let data = "";
  if (req.url.includes("api")) data = JSON.stringify(req.body);

  logger.info(`${getTimeStr()} ${req.method} ${req.url} ${data}`);
  next();
});

/* main */
app.use(homeRouter, someRouter).use(usersRouter, postsRouter);

app.get("/favicon.ico", (req, res) => {
  fsPromiced
    .readFile(withPath(__dirname + "public/ico/favicon-32x32.png"))
    .catch((err) => {
      res.status(404).send();
      logger.error(404);
    })
    .then((data) => res.send(data));
});

app.use((req, res, next) => {
  if (req.url.includes("api")) {
    console.log("app.js");
    res.status(400).send();
    logger.error(400);
    return;
  }
  next();
});

app.use((req, res) => {
  sendErrorPage(req, res, 404);
  logger.error(404);
});

/* footer */
app.listen(PORT, () =>
  logger.info(
    `run on ${PORT} port. http://localhost${PORT !== 80 ? ":" + PORT : ""}/`
  )
);
