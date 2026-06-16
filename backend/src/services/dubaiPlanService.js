const { readJson } = require('../utils/dataLoader');
const { arrayify, normalize } = require('../utils/text');

function attractionScore(attraction, input) {
  const interests = arrayify(input.interests).map(normalize);
  let score = 0;

  if (normalize(attraction.budget) === normalize(input.budget)) score += 2;
  if (normalize(attraction.time) === normalize(input.time)) score += 1;
  if ((attraction.groups || []).map(normalize).includes(normalize(input.group))) score += 1;

  const attractionInterests = new Set((attraction.interests || []).map(normalize));
  interests.forEach((interest) => {
    if (attractionInterests.has(interest)) score += 1;
  });

  return score;
}

function buildDubaiPlan(input) {
  const attractions = readJson('dubai-attractions.json');
  const plans = readJson('dubai-plans.json');

  const predefinedPlan = plans.find(
    (plan) =>
      normalize(plan.budget) === normalize(input.budget) &&
      normalize(plan.time) === normalize(input.time) &&
      normalize(plan.group) === normalize(input.group),
  );

  const selectedAttractions = predefinedPlan
    ? predefinedPlan.attractionIds.map((id) => attractions.find((attraction) => attraction.id === id)).filter(Boolean)
    : attractions
        .map((attraction) => ({ ...attraction, score: attractionScore(attraction, input) }))
        .sort((a, b) => b.score - a.score || a.costUsd - b.costUsd)
        .slice(0, 4);

  const estimatedCost = selectedAttractions.reduce((sum, attraction) => sum + Number(attraction.costUsd || 0), 0);

  return {
    attractions: selectedAttractions,
    estimatedCost,
    notes:
      predefinedPlan?.notes ||
      ['Custom Dubai plan generated from attractions dataset.', 'Confirm availability for premium experiences before final quotation.'],
  };
}

module.exports = { buildDubaiPlan };
