const getFilePath = (path) => {
  return `${__dirname}/../view${path}`;
};

module.exports = { getFilePath };
