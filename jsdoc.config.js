module.exports = {
  plugins: [],
  recurseDepth: 10,
  source: {
    include: ["./helpers/"],
    includePattern: ".+\\.js$",
    excludePattern: "(^|\\/|\\\\)_",
  },
  sourceType: "module",
  tags: {
    allowUnknownTags: true,
    dictionaries: ["jsdoc", "closure"],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
  opts: {
    destination: "./doc/funcs/",
    recurse: true,
    // tutorials: "path/to/tutorials",
  },
};
