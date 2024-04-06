/* config */
const Joi = require("joi");
const { logger } = require("../../helpers/logger.js");

/* main */
class usersValidationHandlers {
  reqMustHaveBody(req, res, next) {
    if (!req.body) {
      res.status(400).send();
      logger.error(400);
      return;
    }
    next();
  }
  get1(req, res, next) {
    const schemaUrl = Joi.string().pattern(/users\/\d+/);

    if (schemaUrl.validate(req.url).error) {
      res.status(400).send();
      logger.error(400);
      return;
    }

    next();
  }
  get10(req, res, next) {
    const schemaUrl = Joi.string().pattern(/users\/range\/\d+\/\d+/);

    if (schemaUrl.validate(req.url).error) {
      res.status(400).send();
      logger.error(400);
      return;
    }

    next();
  }
  post(req, res, next) {
    const schemaBody = Joi.object({
      username: Joi.string().required(),
    });

    const error = schemaBody.validate(req.body).error;
    if (error) {
      res.status(400).json({ badField: error.details[0].path });
      logger.error(400);
      return;
    }

    next();
  }
  patch(req, res, next) {
    const schemaUrl = Joi.string().pattern(/users\/\d+/),
      schemaBody = Joi.object({
        username: Joi.string().required(),
      });

    if (schemaUrl.validate(req.url).error) {
      res.status(400).send();
      logger.error(400);
      return;
    }

    const error = schemaBody.validate(req.body).error;
    if (schemaBody.validate(req.body).error) {
      res.status(400).json({ badFields: error.details[0].path });
      logger.error(400);
      return;
    }

    next();
  }
  delete(req, res, next) {
    const schemaUrl = Joi.string().pattern(/users\/\d+/);

    if (schemaUrl.validate(req.url).error) {
      res.status(400).send();
      logger.error(400);
      return;
    }

    next();
  }
}
/* footer */
module.exports = new usersValidationHandlers();
