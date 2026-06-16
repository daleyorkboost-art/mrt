const { getVisaChecklist } = require('../services/visaService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const createVisaChecklist = asyncHandler(async (req, res) => {
  const result = getVisaChecklist(req.body);
  return sendSuccess(res, result);
});

module.exports = { createVisaChecklist };
