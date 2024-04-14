/* config */
const { logger } = require("../../utils/logger.js");

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

/* 
Прага
Награждён орденом боевого Красного Знамени за освобождение
На Пушкинской улице установлен бюст В. Закруткину
Ленинград
Благовещенск
Учёба в аспирантуре педагогического института им. А. И. Герцена
После окончания школы В. Закруткин поступает в Педагогический институт
Ростов-на-Дону
В. А. Закруткин родился 27 марта 1908 года
Феодосия
*/
