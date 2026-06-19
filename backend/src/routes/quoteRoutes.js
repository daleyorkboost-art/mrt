const express = require('express');
const { createQuoteEmail, sendEmail } = require('../controllers/quoteController');
const { requireInternalAuth } = require('../middleware/internalAuth');
const { quoteEmailValidator, sendEmailValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/quote-email', requireInternalAuth, quoteEmailValidator, createQuoteEmail);
router.post('/send-email', requireInternalAuth, sendEmailValidator, sendEmail);

module.exports = router;
