const multer = require('multer');
const { validationResult } = require('express-validator');
const { ApiError } = require('../utils/ApiError');
const { logger } = require('../utils/logger');
const { sendError } = require('../utils/response');

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendError(res, 'Validation failed', 422, errors.array());
  }

  return next();
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof multer.MulterError) {
    return sendError(res, error.message, 400);
  }

  if (error instanceof ApiError) {
    return sendError(res, error.message, error.statusCode, error.details);
  }

  logger.error(`Unhandled API error on ${req.method} ${req.originalUrl}`, error);
  return sendError(res, 'Internal server error', 500);
}

module.exports = { errorHandler, validateRequest };
