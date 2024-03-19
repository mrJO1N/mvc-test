const fsPromiced = require("fs/promises");
const { getFilePathHtml, getFilePath } = require("../helpers/fsHelp.js");

const getHtml = (req, res) => {
  res.render(getFilePathHtml("/home.ejs"), { pageTitle: "home" });
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
