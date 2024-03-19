/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv");

const { withPath, getFilePath } = require("./helpers/fsHelp.js"),
  homeRouter = require("./routes/home.js"),
  someRouter = require("./routes/some.js");

const app = express();
app.disable("etag");
app
  .use(express.static(withPath(__dirname + "/view")))
  .set("views", withPath(__dirname + "/view"))
  .set("view engine", "ejs");

dotenv.config();

const PORT = process.env.PORT ?? 80;

/* ----------- main ------------------ */
app.use(homeRouter, someRouter);

app.get("*", (req, res) => {
  res.render(getFilePath("/error/index.ejs"), {
    errorCode: 404,
    pageTitle: "error",
  });
});
app.listen(PORT, () =>
  console.log(`go to http://localhost${PORT !== 80 ? ":" + PORT : ""}/`)
);
