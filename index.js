const Obserser = require('./src/service/observer');
const arr = require('./src/config/setup.json');
const { logger } = require('./src/middlewares/logs');
const removeOldFiles = require('./src/helpers/remove-olds');
const obserser = new Obserser(); 
const folders = arr.map((item) => item.Folder_Path);

obserser.on('data', (log) => {
  logger.info(log);
  removeOldFiles();
});

obserser.watchFolder(folders);
