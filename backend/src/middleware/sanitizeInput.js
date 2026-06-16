const dangerousKeys = new Set(['__proto__', 'constructor', 'prototype']);

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((safe, [key, entry]) => {
      if (!dangerousKeys.has(key)) {
        safe[key] = sanitizeValue(entry);
      }
      return safe;
    }, {});
  }

  if (typeof value === 'string') {
    return value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '').trim();
  }

  return value;
}

function sanitizeInput(req, res, next) {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }

  if (req.query) {
    req.query = sanitizeValue(req.query);
  }

  if (req.params) {
    req.params = sanitizeValue(req.params);
  }

  next();
}

module.exports = { sanitizeInput };
