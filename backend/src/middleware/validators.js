const { body } = require('express-validator');
const { validateRequest } = require('./errorHandler');

const optionalText = (field) => body(field).optional({ checkFalsy: true }).isString().trim().isLength({ max: 500 });
const requiredText = (field) => body(field).isString().trim().notEmpty().isLength({ max: 500 });

const recommendValidator = [
  requiredText('style'),
  requiredText('group'),
  requiredText('budget'),
  optionalText('wish'),
  validateRequest,
];

const itineraryValidator = [
  requiredText('destination'),
  body('nights').isInt({ min: 1, max: 30 }).toInt(),
  requiredText('travellerType'),
  body('interests').isArray({ min: 1, max: 12 }),
  body('interests.*').isString().trim().isLength({ min: 2, max: 80 }),
  validateRequest,
];

const dubaiPlanValidator = [
  requiredText('budget'),
  requiredText('time'),
  requiredText('group'),
  body('interests').optional({ nullable: true }).isArray({ max: 12 }),
  body('interests.*').optional().isString().trim().isLength({ min: 2, max: 80 }),
  validateRequest,
];

const visaValidator = [
  requiredText('passport'),
  requiredText('destination'),
  requiredText('month'),
  validateRequest,
];

const faqValidator = [
  body('query').isString().trim().isLength({ min: 2, max: 300 }),
  validateRequest,
];

const quoteEmailValidator = [
  requiredText('travellerName'),
  requiredText('destination'),
  requiredText('dates'),
  requiredText('travellerCount'),
  requiredText('budget'),
  optionalText('specialRequests'),
  body('email').isEmail().normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).isString().trim().isLength({ max: 30 }),
  validateRequest,
];

const sendEmailValidator = [
  body('to').isEmail().normalizeEmail(),
  body('subject').isString().trim().isLength({ min: 2, max: 180 }),
  body('html').isString().trim().isLength({ min: 10, max: 50000 }),
  validateRequest,
];

const captionValidator = [
  requiredText('style'),
  requiredText('mood'),
  validateRequest,
];

const visitorSignalValidator = [
  body('type').isIn(['page_view', 'hover', 'scroll_depth', 'tool_engagement', 'micro_conversion', 'return_visit']),
  body('category').isIn(['destination_interest', 'tool_engagement', 'micro_conversion', 'return_visit']),
  requiredText('label'),
  requiredText('page'),
  body('visitorId').isString().trim().isLength({ min: 8, max: 120 }),
  body('sessionId').isString().trim().isLength({ min: 8, max: 120 }),
  body('value').optional({ nullable: true }).isFloat({ min: 0, max: 100000 }),
  body('metadata').optional({ nullable: true }).isObject(),
  validateRequest,
];

module.exports = {
  recommendValidator,
  itineraryValidator,
  dubaiPlanValidator,
  visaValidator,
  faqValidator,
  quoteEmailValidator,
  sendEmailValidator,
  captionValidator,
  visitorSignalValidator,
};
