const { createLogger, format, transports } = require('winston');

const { combine, timestamp, simple } = format;
const { datetimeNow } = require('../utils/current');
require('dotenv').config();

/**
 * Gets the logger instance
 * @returns {LoggerInstance} winLogger
 */

const timezonedTime = () => {
  return datetimeNow();
};

const logger = createLogger({
  format: combine(timestamp({ format: timezonedTime }), simple()),
  transports: [
    new transports.Console({
      colorize: true,
    }),
    new transports.File({
      filename: `${process.env.LOGS}/nfes_watch.log`,
      maxSize: '50m',
      maxFiles: '20d',
      eol: '\r\n'
    }),
  ],
});

module.exports = {
  logger,
};
