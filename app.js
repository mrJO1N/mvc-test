/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv"),
  fsPromiced = require("fs/promises");

const {
    withPath,
    getFilePath,
    getFilePathHtml,
  } = require("./helpers/fsHelp.js"),
  { logger, getTimeStr } = require("./helpers/logger.js");

const homeRouter = require("./routes/home.router.js"),
  someRouter = require("./routes/some.router.js"),
  usersRouter = require("./routes/users.router.js"),
  postsRouter = require("./routes/posts.router.js");
const {
  sendError,
  sendErrorPage,
} = require("./controllers/errors.controller.js");
const { getOtherFile } = require("./controllers/main.controller.js");

const app = express();
app.disable("etag");
app
  .use(express.static(withPath(__dirname + "/public")))
  .set("views", withPath(__dirname + "/view"))
  .set("view engine", "ejs");
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT ?? 80;

/* ---------- loging ----------------- */

app.use((req, res, next) => {
  let data = "";
  if (req.url.includes("api")) data = JSON.stringify(req.body);

  logger.info(`${getTimeStr()} ${req.method} ${req.url} ${data}`);
  next();
});

/* ----------- main ------------------ */

app.use(homeRouter, someRouter, usersRouter, postsRouter);

app.get("/favicon.ico", (req, res) => {
  fsPromiced
    .readFile(withPath(__dirname + "public/ico/favicon-32x32.png"))
    .catch((err) => {
      sendErrorPage(req, res, 404);
      logger.error(`404. ${err}`);
    })
    .then((data) => res.send(data));
});

app.use((req, res) => {
  sendErrorPage(req, res, 404);
  logger.error(404);
});
app.listen(PORT, () =>
  logger.info(
    `run on ${PORT} port. http://localhost${PORT !== 80 ? ":" + PORT : ""}/`
  )
);
