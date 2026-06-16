const express = require('express');
const { recommend } = require('../controllers/recommendationController');
const { recommendValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/recommend', recommendValidator, recommend);

module.exports = router;
