const EventEmitter = require('events').EventEmitter;
const path = require('path');
const { copyFileSync } = require('fs-extra');
const { watch } = require('chokidar');
const { logger } = require('../middlewares/logs');
require('dotenv').config();

/**
 * Reads new files added
 * @event watch
 */

class Observer extends EventEmitter {
  watchFolder(folders) {
    try {
      watch(folders).on('add', async (originFiles) => {

        if (originFiles.includes('.pdf')) {
         this.emit('data', originFiles);

         copyFileSync(
          originFiles,
          `${process.env.NEW_FILES}/${path.basename(originFiles)}`
        );

      }});
    } catch (err) {
      return logger.error(`Failed to observe files: ${err}`);
    }
  }
}

module.exports = Observer;
