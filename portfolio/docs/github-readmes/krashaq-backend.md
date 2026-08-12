# Krashaq Backend — FastAPI + LangChain LLM Pipeline

Backend for [Krashaq](https://krashaq-agritech.vercel.app) — multilingual AI farming assistant.

## Features

- **LangChain** intent router for crop, weather, and irrigation queries
- **Ollama** local inference with **Gemini** fallback
- **Twilio** WhatsApp webhook handler (Hindi / Hinglish / English)
- **WeatherAPI** integration for smart irrigation engine
- **Redis** session + advisory caching
- **APScheduler** for proactive crop alerts
- **MongoDB** multi-tenant farmer profiles

## Architecture

```
POST /api/advisory     → LangChain router → Ollama / Gemini
POST /webhook/whatsapp → Twilio handler   → intent pipeline
GET  /api/weather      → WeatherAPI      → Redis cache
Scheduler              → APScheduler     → push alerts
```

## Setup

```bash
git clone https://github.com/yashdark01/krashaq-backend
cd krashaq-backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

## Environment Variables

```env
MONGODB_URI=
REDIS_URL=
OLLAMA_BASE_URL=
GEMINI_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
WEATHER_API_KEY=
```

## Related Repos

- [Frontend](https://github.com/yashdark01/krashaq-agritech)
- [Case Study](https://yashpatidar.vercel.app/work/krashaq)

## Author

[Yash Patidar](https://yashpatidar.vercel.app) · Full Stack Engineer
