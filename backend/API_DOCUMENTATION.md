# MyGlobalTrips API Documentation

Base URL:

```text
http://localhost:5000
```

All API responses use:

```json
{
  "success": true,
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "message": "error message"
}
```

## Health

`GET /health`

Returns service health and timestamp.

## Trip Recommender

`POST /api/recommend`

Body:

```json
{
  "style": "luxury",
  "group": "couple",
  "budget": "premium",
  "wish": "desert"
}
```

Scores destinations with style, group, budget, and wish matches. Returns top 5 matches or top 3 popular fallback destinations.

## Itinerary Builder

`POST /api/itinerary`

Body:

```json
{
  "destination": "Dubai",
  "nights": 4,
  "travellerType": "couple",
  "interests": ["fine dining", "culture", "desert"]
}
```

Matching order:

1. Exact destination, duration, traveller type, and at least 2 interest matches
2. Destination and duration
3. Closest duration

## Dubai Day Planner

`POST /api/dubai-plan`

Body:

```json
{
  "budget": "premium",
  "time": "full day",
  "group": "couple",
  "interests": ["desert", "luxury"]
}
```

Returns attractions, estimated cost, and planning notes.

## Visa Checklist Generator

`POST /api/visa`

Body:

```json
{
  "passport": "Indian",
  "destination": "UAE",
  "month": "August 2026"
}
```

Returns visa type, validity, documents, fees, processing time, month-specific notes, packing list, and notices.

## FAQ Chatbot

`POST /api/faq`

Body:

```json
{
  "query": "What documents do I need for visa?"
}
```

Lowercases and tokenizes the query, scores FAQ keyword matches, and returns the best answer.

## Internal Quote Generator

`POST /api/quote-email`

Body:

```json
{
  "travellerName": "Riya Sharma",
  "destination": "Dubai + Maldives",
  "dates": "12-18 September 2026",
  "travellerCount": "2 adults",
  "budget": "$6,000 - $8,000",
  "specialRequests": "Overwater villa and private transfers",
  "email": "riya@example.com",
  "phone": "+971500000000"
}
```

Returns generated email subject and HTML.

## Send Quote Email

`POST /api/send-email`

Body:

```json
{
  "to": "client@example.com",
  "subject": "Your MyGlobalTrips quote",
  "html": "<p>Hello from MyGlobalTrips</p>"
}
```

Uses SMTP credentials from `.env`.

## AI Caption Generator

`POST /api/caption`

Content type: `multipart/form-data`

Fields:

- `image`: JPG, PNG, or WEBP, max 5MB
- `style`: caption style
- `mood`: caption mood

Returns:

```json
{
  "success": true,
  "data": {
    "captions": [],
    "hashtags": [],
    "imageUrl": "http://localhost:5000/uploads/file.jpg"
  }
}
```

Rate limit: 10 requests per IP per hour.
