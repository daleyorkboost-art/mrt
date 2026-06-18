const express = require('express');
const { captureSignal, signalSummary } = require('../controllers/visitorSignalController');
const { visitorSignalValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/visitor-signal', visitorSignalValidator, captureSignal);
router.get('/visitor-signals/summary', signalSummary);

module.exports = router;
