const { readJson } = require('../utils/dataLoader');
const { tokenize, normalize } = require('../utils/text');

function answerFaq(query) {
  const dataset = readJson('faq-data.json');
  const queryTokens = new Set(tokenize(query));

  const best = dataset
    .map((item) => {
      const score = (item.keywords || []).reduce((sum, keyword) => {
        const keywordTokens = tokenize(keyword);
        const matched = keywordTokens.some((token) => queryTokens.has(token) || normalize(query).includes(token));
        return sum + (matched ? 1 : 0);
      }, 0);

      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)[0];

  if (!best || best.score === 0) {
    return {
      answer: "I don't have an answer for that right now. Please contact our team on WhatsApp.",
      follow_up_suggestions: [],
    };
  }

  return {
    id: best.id,
    category: best.category,
    answer: best.answer,
    follow_up_suggestions: best.follow_up_suggestions,
  };
}

module.exports = { answerFaq };
