const crypto = require('crypto');
const { env } = require('../config/env');
const { ApiError } = require('../utils/ApiError');

const TOKEN_TTL_MS = 60 * 60 * 1000;

function getSecret() {
  if (!env.internalQuotePassword || !env.internalAuthSecret) {
    throw new ApiError('Internal quote authentication is not configured.', 503);
  }

  return env.internalAuthSecret;
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function createInternalToken(password) {
  if (password !== env.internalQuotePassword) {
    throw new ApiError('Invalid internal access password.', 401);
  }

  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  return {
    token: `${payload}.${sign(payload)}`,
    expiresInSeconds: TOKEN_TTL_MS / 1000,
  };
}

function verifyInternalToken(token) {
  if (!token || typeof token !== 'string') {
    throw new ApiError('Internal authorization token is required.', 401);
  }

  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(sign(payload), signature)) {
    throw new ApiError('Invalid internal authorization token.', 401);
  }

  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch (error) {
    throw new ApiError('Invalid internal authorization token.', 401);
  }

  if (!decoded.exp || Date.now() > decoded.exp) {
    throw new ApiError('Internal authorization token has expired.', 401);
  }

  return true;
}

module.exports = { createInternalToken, verifyInternalToken };
