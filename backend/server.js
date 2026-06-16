const app = require('./src/app');
const { env } = require('./src/config/env');
const { logger } = require('./src/utils/logger');

const server = app.listen(env.port, () => {
  logger.info(`MyGlobalTrips API running on port ${env.port}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => process.exit(0));
});
