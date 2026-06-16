const logger = {
  info(message, meta) {
    console.log(JSON.stringify({ level: 'info', message, meta, timestamp: new Date().toISOString() }));
  },
  warn(message, meta) {
    console.warn(JSON.stringify({ level: 'warn', message, meta, timestamp: new Date().toISOString() }));
  },
  error(message, error) {
    console.error(
      JSON.stringify({
        level: 'error',
        message,
        error: error && {
          name: error.name,
          message: error.message,
          stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
        },
        timestamp: new Date().toISOString(),
      }),
    );
  },
};

module.exports = { logger };
