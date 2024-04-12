/* config */
const express = require("express"),
  dotenv = require("dotenv"),
  fsPromiced = require("fs/promises");

const { makeWithPath, getFilePathHtml } = require("./helpers/fsHelp.js"),
  { logger, getTimeStr, l } = require("./helpers/logger.js");

// routers
const homeRouter = require("./routes/home.router.js"),
  someRouter = require("./routes/some.router.js"),
  authRouter = require("./routes/auth.router.js");
const usersRouter = require("./routes/users.router.js"),
  postsRouter = require("./routes/posts.router.js");

const app = express();
app.disable("etag"); // non browser caching
app
  .use(express.static(makeWithPath(__dirname + "/public")))
  .set("views", makeWithPath(__dirname + "/view"))
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
app.all(/api/, usersRouter, postsRouter);

app.use(homeRouter, someRouter, authRouter);

app.get("/favicon.ico", (req, res) => {
  fsPromiced
    .readFile(makeWithPath(__dirname + "public/ico/favicon-32x32.png"))
    .catch((err) => {
      res.status(404).send();
      logger.error(404);
    })
    .then((data) => res.send(data));
});

app.options("*", (req, res) => {
  res
    .setHeader("Access-Control-Allow-Methods", ["POST", "GET", "OPTIONS"])
    .status(200)
    .send();
  logAllRight();
});

app.all(/api/, (req, res) => {
  console.log("app.js");
  res.status(400).send();
  logger.error(400);
  return;
});

app.all("*", (req, res) => {
  res.status(404).render(getFilePathHtml("/error.ejs"), {
    errorCode: 404,
    pageTitle: "error",
  });
  logger.error(404);
});

/* footer */
app.listen(PORT, () =>
  logger.info(
    `run on ${PORT} port. http://localhost${PORT !== 80 ? ":" + PORT : ""}/`
  )
);

module.exports = { app };
