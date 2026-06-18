const { readJson } = require('../utils/dataLoader');
const { ApiError } = require('../utils/ApiError');
const { normalize } = require('../utils/text');

function getVisaChecklist(input) {
  const dataset = readJson('visa-data.json');
  const monthName = String(input.month || '').split(/\s+/)[0];
  const passportAliases = {
    indian: 'in',
    india: 'in',
    us: 'us',
    usa: 'us',
    'united states': 'us',
    uk: 'gb',
    'united kingdom': 'gb',
    singapore: 'sg',
    uae: 'ae',
  };
  const passport = passportAliases[normalize(input.passport)] || normalize(input.passport);
  const record = dataset.find(
    (item) => normalize(item.passport) === passport && normalize(item.destination) === normalize(input.destination),
  );

  if (!record) {
    throw new ApiError('No visa data found for this passport and destination combination', 404);
  }

  return {
    visa_type: record.visa_type,
    validity_days: record.validity_days,
    required_documents: record.required_documents,
    estimated_fees_usd: record.estimated_fees_usd,
    processing_time: record.processing_time,
    month_specific_notes:
      record.month_specific_notes?.[monthName] || 'No specific advisory for this travel month. Verify latest official guidance before departure.',
    packing_list: record.packing_list,
    important_notices: record.important_notices,
  };
}

module.exports = { getVisaChecklist };
