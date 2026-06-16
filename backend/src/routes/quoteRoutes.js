const express = require('express');
const { createQuoteEmail, sendEmail } = require('../controllers/quoteController');
const { quoteEmailValidator, sendEmailValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/quote-email', quoteEmailValidator, createQuoteEmail);
router.post('/send-email', sendEmailValidator, sendEmail);

module.exports = router;
