/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv");

const {
    withPath,
    getFilePath,
    getFilePathHtml,
  } = require("./helpers/fsHelp.js"),
  logger = require("./helpers/logger.js");

const homeRouter = require("./routes/home.router.js"),
  someRouter = require("./routes/some.router.js"),
  usersRouter = require("./routes/users.router.js");

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
  logger.error("new logger now!!!");
  next();
});
app.use(express.json());
app.use(homeRouter, someRouter, usersRouter);

app.get("*", (req, res) => {
  res.render(getFilePathHtml("/error.ejs"), {
    errorCode: 404,
    pageTitle: "error",
  });
});
app.listen(PORT, () =>
  console.log(`go to http://localhost${PORT !== 80 ? ":" + PORT : ""}/`)
);
