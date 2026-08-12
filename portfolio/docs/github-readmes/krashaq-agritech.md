# Krashaq — AI Smart Farming Assistant

Multilingual AI agricultural assistant with **FastAPI**, **Next.js**, **LangChain**, **Ollama**, and **WhatsApp** integration.

[![Live Demo](https://img.shields.io/badge/demo-live-10b981?style=flat-square)](https://krashaq-agritech.vercel.app)
[![Portfolio Case Study](https://img.shields.io/badge/case_study-read-10b981?style=flat-square)](https://yashpatidar.vercel.app/work/krashaq)

## Problem

Farmers need real-time crop advice in **Hindi, Hinglish, and English** — often via WhatsApp, not a web app. Expert agronomists aren't available at scale.

## What I Built

- **Next.js** frontend with farmer dashboard and advisory UI
- **FastAPI** backend with LangChain intent routing (crop / weather / irrigation)
- **Ollama** local LLM + **Gemini** cloud fallback
- **Twilio** two-way WhatsApp webhooks
- **WeatherAPI** + **APScheduler** for proactive irrigation alerts
- **Redis** caching for multi-tenant farmer sessions

## Architecture

```
Farmer (Web / WhatsApp)
        ↓
Next.js Frontend ──→ FastAPI Backend ──→ Ollama (local LLM)
        ↓                    ↓
   WeatherAPI          Gemini (fallback)
        ↓                    ↓
   APScheduler         LangChain router
        ↓                    ↓
   Redis cache         MongoDB (profiles)
```

## Key Trade-offs

| Decision | Why |
|----------|-----|
| Ollama + Gemini fallback | Cost + privacy locally; reliability in cloud |
| Redis cache | Avoid WeatherAPI rate limits on repeat queries |
| MongoDB | Flexible schema for multi-tenant farmer profiles |

## Links

- **Live Demo:** https://krashaq-agritech.vercel.app
- **Backend Repo:** https://github.com/yashdark01/krashaq-backend
- **Case Study:** https://yashpatidar.vercel.app/work/krashaq
- **Author:** [Yash Patidar](https://yashpatidar.vercel.app)

## Tech Stack

`Next.js` · `FastAPI` · `MongoDB` · `LangChain` · `Ollama` · `Redis` · `Twilio` · `Tailwind CSS`

## Setup

```bash
# Frontend
git clone https://github.com/yashdark01/krashaq-agritech
cd krashaq-agritech
npm install
cp .env.example .env.local
npm run dev

# Backend (separate repo)
git clone https://github.com/yashdark01/krashaq-backend
cd krashaq-backend
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

## Author

**Yash Patidar** — Full Stack Engineer · IIIT Nagpur  
[Portfolio](https://yashpatidar.vercel.app) · [LinkedIn](https://linkedin.com/in/yash-patidar-97a8861b3) · [LeetCode](https://leetcode.com/u/yashdark_01/)
