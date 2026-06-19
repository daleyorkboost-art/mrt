const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { env } = require('./config/env');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { notFoundHandler } = require('./middleware/notFoundHandler');
const { requestLogger } = require('./middleware/requestLogger');
const { requestTimeout } = require('./middleware/requestTimeout');
const { sanitizeInput } = require('./middleware/sanitizeInput');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes('*') || env.corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: !env.corsOrigins.includes('*'),
  }),
);

app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    limit: env.rateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests. Please try again later.',
    },
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(requestTimeout);
app.use(requestLogger);
app.use(sanitizeInput);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'MyGlobalTrips API',
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
  });
});

app.use('/uploads', express.static(env.uploadDir));
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
