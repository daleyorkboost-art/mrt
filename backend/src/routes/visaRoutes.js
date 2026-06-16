const express = require('express');
const { createVisaChecklist } = require('../controllers/visaController');
const { visaValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/visa', visaValidator, createVisaChecklist);

module.exports = router;
