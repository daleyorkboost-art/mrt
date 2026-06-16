const { buildDubaiPlan } = require('../services/dubaiPlanService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const createDubaiPlan = asyncHandler(async (req, res) => {
  const result = buildDubaiPlan(req.body);
  return sendSuccess(res, result);
});

module.exports = { createDubaiPlan };
