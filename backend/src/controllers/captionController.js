const { generateCaption } = require('../services/captionService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const createCaption = asyncHandler(async (req, res) => {
  const result = await generateCaption(req.body, req.file);
  return sendSuccess(res, result);
});

module.exports = { createCaption };
