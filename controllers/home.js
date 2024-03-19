const fsPromiced = require("fs/promises");
const { getFilePath } = require("../helpers/fsHelp.js");

const getHtml = (req, res) => {
  res.render(getFilePath("/home/index.ejs"), { pageTitle: "home" });
};

const getCssOrJs = (req, res) => {
  fsPromiced
    .readFile(getFilePath(req.url))
    .catch((err) => {
      console.error(err);
    })
    .then((data) => {
      res.send(data);
    });
};

module.exports = { getHtml, getCssOrJs };
