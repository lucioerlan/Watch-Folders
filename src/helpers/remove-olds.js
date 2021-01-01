const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');
const { EventEmitter } = require('events');
const ms = require('ms');
const { logger } = require('../middlewares/logs');
require('dotenv').config();

/**
 * Delete files that are longer than 1 minute
 * @class removeOldFiles
 */

class Remove extends EventEmitter {
  async removeOldFiles() {
    try {
      const files = readdirSync(process.env.NEW_FILES);
      files.forEach((file) => {
        const stats = statSync(join(process.env.NEW_FILES, file));
        const now = new Date().getTime();

        const endTime = new Date(stats.ctime).getTime() + ms('24h');

        if (now > endTime) {
          unlinkSync(join(process.env.NEW_FILES, file));
          logger.info(`Remove - ${file}`);
        }

      });
    } catch (err) {
      return logger.error(`Delete Old Files failed: ${err}`);
    }
  }
}

module.exports = Remove;
