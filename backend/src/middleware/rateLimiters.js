const rateLimit = require('express-rate-limit');

const captionRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Caption generation limit reached. Please try again later.',
  },
});

module.exports = { captionRateLimiter };
