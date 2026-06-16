const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { env } = require('../config/env');
const { ApiError } = require('../utils/ApiError');

fs.mkdirSync(env.uploadDir, { recursive: true });

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, env.uploadDir);
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
    const ext = path.extname(safeName).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter(req, file, cb) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new ApiError('Only JPG, PNG, and WEBP images are allowed', 400));
    }

    return cb(null, true);
  },
});

module.exports = { imageUpload };
