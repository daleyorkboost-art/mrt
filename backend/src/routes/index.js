const express = require('express');
const recommendationRoutes = require('./recommendationRoutes');
const itineraryRoutes = require('./itineraryRoutes');
const dubaiPlanRoutes = require('./dubaiPlanRoutes');
const visaRoutes = require('./visaRoutes');
const faqRoutes = require('./faqRoutes');
const quoteRoutes = require('./quoteRoutes');
const captionRoutes = require('./captionRoutes');
const visitorSignalRoutes = require('./visitorSignalRoutes');

const router = express.Router();

router.use(recommendationRoutes);
router.use(itineraryRoutes);
router.use(dubaiPlanRoutes);
router.use(visaRoutes);
router.use(faqRoutes);
router.use(quoteRoutes);
router.use(captionRoutes);
router.use(visitorSignalRoutes);

module.exports = router;
