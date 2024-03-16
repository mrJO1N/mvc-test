const fsPromiced = require("fs/promises");
const { getFilePath } = require("../helpers/fsHelp.js");

const getHome = (req, res) => {
  res.render(getFilePath("/home/index.ejs"));
};

module.exports = { getHome };
