# MyGlobalTrips Backend

Production-ready Express backend for the MyGlobalTrips travel platform. It uses JSON datasets only, with no database.

## Stack

- Node.js 20+
- Express.js
- JavaScript
- dotenv
- cors
- helmet
- express-rate-limit
- express-validator
- multer
- nodemailer
- Gemini API

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API health check:

```bash
curl http://localhost:5000/health
```

## Scripts

```bash
npm start
npm run dev
npm run lint
npm run smoke
```

## Environment

Gemini is required for production AI captions. If `GEMINI_API_KEY` is empty in local development, `/api/caption` returns a fallback response after validating the upload.

SMTP is required for `/api/send-email`. If SMTP variables are missing, the endpoint returns a clear `503` error.

In production, set `INTERNAL_QUOTE_PASSWORD`, `INTERNAL_AUTH_SECRET`, `GEMINI_API_KEY`, SMTP credentials, and a restricted `CORS_ORIGIN`. The server refuses to boot in production if these required values are missing.

## Response Shape

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "error message"
}
```

## Deployment With PM2

```bash
cd backend
npm install --omit=dev
pm2 start ecosystem.config.cjs
pm2 save
```

## Data Storage

All platform data lives in `src/data/*.json`. The backend reads those datasets directly and caches them in memory per process. There is no database dependency.

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Postman

Import [postman/MyGlobalTrips.postman_collection.json](./postman/MyGlobalTrips.postman_collection.json).
