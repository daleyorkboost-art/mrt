const path = require('path');
require('dotenv').config();

const rootDir = path.resolve(__dirname, '../..');

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  corsOrigins: (process.env.CORS_ORIGIN || '*').split(',').map((origin) => origin.trim()),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100),
  uploadDir: process.env.UPLOAD_DIR
    ? path.resolve(rootDir, process.env.UPLOAD_DIR)
    : path.resolve(rootDir, 'uploads'),
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:5000',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiVisionModel: process.env.OPENAI_VISION_MODEL || 'gpt-4o',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'MyGlobalTrips <no-reply@myglobaltrips.com>',
  },
};

module.exports = { env, rootDir };
