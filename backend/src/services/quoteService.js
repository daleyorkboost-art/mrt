const { createTransporter } = require('../config/mailer');
const { env } = require('../config/env');
const { readJson } = require('../utils/dataLoader');
const { ApiError } = require('../utils/ApiError');
const { escapeHtml } = require('../utils/text');

function replacePlaceholders(template, values) {
  return Object.entries(values).reduce((output, [key, value]) => output.replaceAll(`{{${key}}}`, escapeHtml(value || 'None')), template);
}

function generateQuoteEmail(input) {
  const templates = readJson('quote-templates.json');
  const template = templates.default;
  const values = {
    name: input.travellerName,
    destination: input.destination,
    dates: input.dates,
    travellers: input.travellerCount,
    budget: input.budget,
    requests: input.specialRequests || 'No special requests shared yet',
  };

  return {
    subject: replacePlaceholders(template.subject, values),
    html: replacePlaceholders(template.html, values),
  };
}

async function sendQuoteEmail(input) {
  const transporter = createTransporter();

  if (!transporter) {
    throw new ApiError('SMTP is not configured. Add SMTP settings to .env.', 503);
  }

  const info = await transporter.sendMail({
    from: env.smtp.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
  });

  return {
    delivered: true,
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
}

module.exports = { generateQuoteEmail, sendQuoteEmail };
