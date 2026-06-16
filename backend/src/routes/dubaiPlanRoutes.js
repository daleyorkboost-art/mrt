const express = require('express');
const { createDubaiPlan } = require('../controllers/dubaiPlanController');
const { dubaiPlanValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/dubai-plan', dubaiPlanValidator, createDubaiPlan);

module.exports = router;
