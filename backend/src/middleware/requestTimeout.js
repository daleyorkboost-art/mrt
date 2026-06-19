const { env } = require('../config/env');

function requestTimeout(req, res, next) {
  req.setTimeout(env.requestTimeoutMs, () => {
    if (!res.headersSent) {
      res.status(408).json({
        success: false,
        message: 'Request timed out. Please try again.',
      });
    }
  });

  next();
}

module.exports = { requestTimeout };
