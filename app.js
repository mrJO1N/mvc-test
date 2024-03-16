/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv");

const { withPath } = require("./helpers/fsHelp.js"),
  homeRouter = require("./routes/home.js");

const app = express();
app
  .use(express.static(withPath(__dirname + "/view")))
  .disable("etag")
  .set("views", withPath(__dirname + "/view"))
  .set("view engine", "ejs");
dotenv.config();

const PORT = process.env.PORT ?? 80;

/* ----------- main ------------------ */
app.use(homeRouter);

app.listen(PORT, () =>
  console.log(`go to http://localhost${PORT !== 80 ? ":" + PORT : ""}/`)
);
