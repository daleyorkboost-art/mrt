const express = require('express');
const { createCaption } = require('../controllers/captionController');
const { captionRateLimiter } = require('../middleware/rateLimiters');
const { imageUpload } = require('../middleware/upload');
const { captionValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/caption', captionRateLimiter, imageUpload.single('image'), captionValidator, createCaption);

module.exports = router;
