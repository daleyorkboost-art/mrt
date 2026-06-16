const { buildItinerary } = require('../services/itineraryService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const createItinerary = asyncHandler(async (req, res) => {
  const result = buildItinerary(req.body);
  return sendSuccess(res, result);
});

module.exports = { createItinerary };
