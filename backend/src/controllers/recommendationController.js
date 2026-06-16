const { recommendTrips } = require('../services/recommendationService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const recommend = asyncHandler(async (req, res) => {
  const results = recommendTrips(req.body);
  return sendSuccess(res, { results });
});

module.exports = { recommend };
