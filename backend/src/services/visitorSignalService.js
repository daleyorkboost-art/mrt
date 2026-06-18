const fs = require('fs');
const path = require('path');
const { rootDir } = require('../config/env');
const { ApiError } = require('../utils/ApiError');

const signalFile = path.resolve(rootDir, 'src/data/visitor-signals.json');

function readSignals() {
  try {
    return JSON.parse(fs.readFileSync(signalFile, 'utf8'));
  } catch (error) {
    throw new ApiError('Unable to read visitor signals', 500, error.message);
  }
}

function writeSignals(signals) {
  fs.writeFileSync(signalFile, `${JSON.stringify(signals.slice(-5000), null, 2)}\n`);
}

function captureVisitorSignal(input, requestMeta) {
  const signals = readSignals();
  const signal = {
    id: `sig_${Date.now()}_${Math.round(Math.random() * 1e9)}`,
    type: input.type,
    category: input.category,
    label: input.label,
    page: input.page,
    value: input.value || null,
    metadata: input.metadata || {},
    visitorId: input.visitorId,
    sessionId: input.sessionId,
    userAgent: requestMeta.userAgent,
    ip: requestMeta.ip,
    createdAt: new Date().toISOString(),
  };

  signals.push(signal);
  writeSignals(signals);

  return signal;
}

function getVisitorSignalSummary() {
  const signals = readSignals();
  const byCategory = signals.reduce((summary, signal) => {
    summary[signal.category] = (summary[signal.category] || 0) + 1;
    return summary;
  }, {});
  const byType = signals.reduce((summary, signal) => {
    summary[signal.type] = (summary[signal.type] || 0) + 1;
    return summary;
  }, {});

  return {
    total: signals.length,
    byCategory,
    byType,
    latest: signals.slice(-20).reverse(),
  };
}

module.exports = { captureVisitorSignal, getVisitorSignalSummary };
