const { verifyInternalToken } = require('../services/internalAuthService');

function requireInternalAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  verifyInternalToken(token);
  next();
}

module.exports = { requireInternalAuth };
