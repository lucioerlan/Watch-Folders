const { EventEmitter } = require('events');
const { basename } = require('path');
const { copyFileSync } = require('fs-extra');
const { watch } = require('chokidar');
const { logger } = require('../middlewares/logs');

/**
 * Reads new files added
 * @event watch
 */

class Observer extends EventEmitter {
  watchFolder(folders) {
    try {
      watch(folders).on('add', (originFiles) => {
     
        const files = basename(originFiles);

        if (originFiles.includes('.pdf')) {
          copyFileSync(originFiles, `${process.env.NEW_FILES}/${files}`);
          logger.info(`Add - ${originFiles}`);
        }});
      
    } catch (err) {
       logger.error(err.message);
    }
  }
}

module.exports = Observer;
