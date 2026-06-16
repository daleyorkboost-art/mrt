module.exports = {
  apps: [
    {
      name: 'myglobaltrips-api',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      max_memory_restart: '300M',
      error_file: './logs/api-error.log',
      out_file: './logs/api-out.log',
      time: true,
    },
  ],
};
