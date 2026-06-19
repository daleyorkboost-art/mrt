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
  requestTimeoutMs: Number(process.env.REQUEST_TIMEOUT_MS || 30000),
  uploadDir: process.env.UPLOAD_DIR
    ? path.resolve(rootDir, process.env.UPLOAD_DIR)
    : path.resolve(rootDir, 'uploads'),
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:5000',
  internalQuotePassword: process.env.INTERNAL_QUOTE_PASSWORD || '',
  internalAuthSecret: process.env.INTERNAL_AUTH_SECRET || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiVisionModel: process.env.OPENAI_VISION_MODEL || 'gpt-4o',
  openaiTimeoutMs: Number(process.env.OPENAI_TIMEOUT_MS || 30000),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'MyGlobalTrips <info@myglobaltrips.com>',
  },
};

if (env.nodeEnv === 'production') {
  const missing = [];
  if (!env.internalQuotePassword) missing.push('INTERNAL_QUOTE_PASSWORD');
  if (!env.internalAuthSecret) missing.push('INTERNAL_AUTH_SECRET');
  if (!env.openaiApiKey) missing.push('OPENAI_API_KEY');
  if (!env.smtp.host) missing.push('SMTP_HOST');
  if (!env.smtp.user) missing.push('SMTP_USER');
  if (!env.smtp.pass) missing.push('SMTP_PASS');
  if (env.corsOrigins.includes('*')) missing.push('CORS_ORIGIN');

  if (missing.length > 0) {
    throw new Error(`Missing production environment configuration: ${missing.join(', ')}`);
  }
}

module.exports = { env, rootDir };
