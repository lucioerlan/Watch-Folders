module.exports = {
  apps: [
    {
      name: 'MONITORING_FOLDERS',
      script: './index.js',
      autorestart: true,
      watch: false,
      exec_mode: 'fork',
      log_date_format: 'YYYY-MM-DD HH:mm:ss:SSS',
    },
  ],
};
