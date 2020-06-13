module.exports = {
  apps: [{
    name: 'AppPowerUtilsService',
    script: 'pm2 start --name nest dist/main.js',
    error_file: "hlog-error.log",
    out_file: "hlog-info.log",
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm Z",

    // Options reference: https://pm2.io/doc/en/runtime/reference/processes-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
};
