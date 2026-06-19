const express = require('express');
const { authenticateInternalQuote } = require('../controllers/internalAuthController');
const { internalAuthValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/internal-auth', internalAuthValidator, authenticateInternalQuote);

module.exports = router;
