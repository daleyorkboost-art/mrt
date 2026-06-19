const nodemailer = require('nodemailer');
const { env } = require('./env');

function createTransporter() {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    connectionTimeout: env.requestTimeoutMs,
    greetingTimeout: env.requestTimeoutMs,
    socketTimeout: env.requestTimeoutMs,
    disableFileAccess: true,
    disableUrlAccess: true,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });
}

module.exports = { createTransporter };
