Weatherly Backend exposes a single /api/weather endpoint that accepts a city name and returns structured weather data.
It is designed to be minimal, fast, and easy to integrate with any frontend—especially the Weatherly React app.

This backend uses:

Vercel Serverless Functions

Node.js (ES Modules)

OpenWeather API

Environment‑based configuration

Clean JSON responses

Features

Fetch current weather by city name

Clean, frontend‑friendly JSON output

Graceful error handling (invalid city, missing params, API failures)

Secure environment variable usage (OPENWEATHER_API_KEY)

Zero‑server architecture (no Express, no ports, no listeners)
