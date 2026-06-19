const { createInternalToken } = require('../services/internalAuthService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const authenticateInternalQuote = asyncHandler(async (req, res) => {
  const result = createInternalToken(req.body.password);
  return sendSuccess(res, result);
});

module.exports = { authenticateInternalQuote };
