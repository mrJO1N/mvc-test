/* config */
const { logger } = require("../../helpers/logger.js");

/* main */
class mainValidationHandlers {
  reqMustHaveBody(req, res, next) {
    if (!req.body) {
      res.status(400).send();
      logger.error(400);
      return;
    }
    next();
  }
}

/* footer */
module.exports = new mainValidationHandlers();
