const ms = require('ms');
const Obserser = require('./src/service/observer');
const Remove = require('./src/helpers/remove-olds');
const arr = require('./src/config/setup.json');

const obserser = new Obserser();
const remove = new Remove();
const folders = arr.map(({ Folder_Path }) => Folder_Path);

const observerFc = (tm, func) =>
  new Promise((resolve) => {
    setTimeout(func, tm);
  });

const removeFc = (tm, func) =>
  new Promise((resolve) => {
    setInterval(func, tm);
  });

observerFc(ms('5s'), () => obserser.watchFolder(folders));
removeFc(ms('1h'), () => remove.removeOldFiles());
