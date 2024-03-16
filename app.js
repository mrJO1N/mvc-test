/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv"),
  path = require("path"),
  ejs = require("ejs");

const homeRouter = require("./routes/home.js");

const app = express();
app
  .use(express.static(path.join(__dirname, "view")))
  .disable("etag")
  .engine("ejs", ejs.renderFile)
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "view"));
dotenv.config();

const PORT = process.env.PORT ?? 80;

/* ----------- main ------------------ */
app.use(homeRouter);

app.listen(PORT, () =>
  console.log(`go to http://localhost${PORT !== 80 ? ":" + PORT : ""}/`)
);
