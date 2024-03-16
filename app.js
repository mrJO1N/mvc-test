/* --------- configure ------------ */
const express = require("express"),
  dotenv = require("dotenv");

const homeRouter = require("./routes/home.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT ?? 80;

/* ----------- main ------------------ */
app.use(homeRouter);

app.listen(PORT, () =>
  console.log(`go to http://localhost${PORT !== 80 ? ":" + PORT : ""}/`)
);
