const express = require('express');
const { createItinerary } = require('../controllers/itineraryController');
const { itineraryValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/itinerary', itineraryValidator, createItinerary);

module.exports = router;
