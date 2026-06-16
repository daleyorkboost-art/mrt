const fs = require('fs');
const path = require('path');
const { ApiError } = require('./ApiError');

const dataDir = path.resolve(__dirname, '../data');
const cache = new Map();

function readJson(filename) {
  const filepath = path.resolve(dataDir, filename);

  if (!filepath.startsWith(dataDir)) {
    throw new ApiError('Invalid dataset path', 400);
  }

  if (cache.has(filepath)) {
    return cache.get(filepath);
  }

  try {
    const raw = fs.readFileSync(filepath, 'utf8');
    const parsed = JSON.parse(raw);
    cache.set(filepath, parsed);
    return parsed;
  } catch (error) {
    throw new ApiError(`Unable to read dataset: ${filename}`, 500, error.message);
  }
}

module.exports = { readJson };
