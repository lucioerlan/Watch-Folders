const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');
const { EventEmitter } = require('events');
const ms = require('ms');
const { logger } = require('../middlewares/logs');

/**
 * Delete files that are longer than 1 minute
 * @class removeOldFiles
 */

class Remove extends EventEmitter {
  async removeOldFiles() {
    try {
      const files = readdirSync(process.env.NEW_FILES);
      files.forEach(file => {
       
        const stats = statSync(join(process.env.NEW_FILES, file));
        const now = new Date().getTime();

        const endTime = new Date(stats.ctime).getTime() + ms('1m');

        if (now > endTime) {
          unlinkSync(join(process.env.NEW_FILES, file));
          logger.info(`Remove - ${file}`);
        }});

    } catch (err) {
       logger.error(err.message);
    }
  }
}

module.exports = Remove;
