function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function tokenize(value) {
  return normalize(value)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function arrayify(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (!value) {
    return [];
  }

  return [String(value)];
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { normalize, tokenize, arrayify, escapeHtml };
