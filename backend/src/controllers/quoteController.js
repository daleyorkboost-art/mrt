const { generateQuoteEmail, sendQuoteEmail } = require('../services/quoteService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const createQuoteEmail = asyncHandler(async (req, res) => {
  const result = generateQuoteEmail(req.body);
  return sendSuccess(res, result);
});

const sendEmail = asyncHandler(async (req, res) => {
  const result = await sendQuoteEmail(req.body);
  return sendSuccess(res, result);
});

module.exports = { createQuoteEmail, sendEmail };
