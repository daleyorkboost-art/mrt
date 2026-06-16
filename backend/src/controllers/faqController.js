const { answerFaq } = require('../services/faqService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const askFaq = asyncHandler(async (req, res) => {
  const result = answerFaq(req.body.query);
  return sendSuccess(res, result);
});

module.exports = { askFaq };
