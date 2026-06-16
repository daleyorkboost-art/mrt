const express = require('express');
const { askFaq } = require('../controllers/faqController');
const { faqValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/faq', faqValidator, askFaq);

module.exports = router;
