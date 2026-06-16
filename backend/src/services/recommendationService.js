const { readJson } = require('../utils/dataLoader');
const { normalize } = require('../utils/text');

function scoreDestination(destination, input) {
  const style = normalize(input.style);
  const group = normalize(input.group);
  const budget = normalize(input.budget);
  const wish = normalize(input.wish);
  const haystack = [
    destination.destination,
    ...(destination.styles || []),
    ...(destination.groups || []),
    ...(destination.budgets || []),
    ...(destination.highlights || []),
  ]
    .map(normalize)
    .join(' ');

  let score = 0;
  if ((destination.styles || []).map(normalize).includes(style)) score += 1;
  if ((destination.groups || []).map(normalize).includes(group)) score += 1;
  if ((destination.budgets || []).map(normalize).includes(budget)) score += 1;
  if (wish && haystack.includes(wish)) score += 1;

  return score;
}

function recommendTrips(input) {
  const dataset = readJson('trips-dataset.json');
  const scored = dataset
    .map((destination) => ({
      ...destination,
      score: scoreDestination(destination, input),
    }))
    .filter((destination) => destination.score > 0)
    .sort((a, b) => b.score - a.score || b.popularity - a.popularity);

  if (scored.length === 0) {
    return dataset
      .slice()
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((destination) => ({ ...destination, score: 0, fallback: true }));
  }

  return scored.slice(0, 5);
}

module.exports = { recommendTrips };
