const { captureVisitorSignal, getVisitorSignalSummary } = require('../services/visitorSignalService');
const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/response');

const captureSignal = asyncHandler(async (req, res) => {
  const signal = captureVisitorSignal(req.body, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  return sendSuccess(res, { signal }, 201);
});

const signalSummary = asyncHandler(async (req, res) => {
  return sendSuccess(res, getVisitorSignalSummary());
});

module.exports = { captureSignal, signalSummary };
