const { readJson } = require('../utils/dataLoader');
const { arrayify, normalize } = require('../utils/text');

function interestMatches(planInterests, requestedInterests) {
  const available = new Set((planInterests || []).map(normalize));
  return requestedInterests.filter((interest) => available.has(normalize(interest))).length;
}

function buildItinerary(input) {
  const dataset = readJson('itinerary-data.json');
  const destination = normalize(input.destination);
  const travellerType = normalize(input.travellerType);
  const interests = arrayify(input.interests);
  const nights = Number(input.nights);

  const destinationMatches = dataset.filter((plan) => normalize(plan.destination) === destination);

  const exact = destinationMatches.find(
    (plan) =>
      Number(plan.duration) === nights &&
      normalize(plan.travellerType) === travellerType &&
      interestMatches(plan.interests, interests) >= 2,
  );

  if (exact) {
    return {
      notice: 'Exact itinerary match found.',
      itinerary: exact,
    };
  }

  const destinationDuration = destinationMatches.find((plan) => Number(plan.duration) === nights);
  if (destinationDuration) {
    return {
      notice: 'Fallback used: destination and duration matched, traveller type or interests adjusted.',
      itinerary: destinationDuration,
    };
  }

  const closestPool = destinationMatches.length > 0 ? destinationMatches : dataset;
  const closest = closestPool
    .slice()
    .sort((a, b) => Math.abs(Number(a.duration) - nights) - Math.abs(Number(b.duration) - nights))[0];

  return {
    notice: 'Second fallback used: closest duration available returned.',
    itinerary: closest,
  };
}

module.exports = { buildItinerary };
