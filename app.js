const express = require("express"),
  dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT ?? 80;

app.get(["/", "/home"], (req, res) => {
  res.send("hello");
});

app.listen(PORT, () =>
  console.log(`go to http://localhost${PORT !== 80 ? ":" + PORT : ""}/`)
);
