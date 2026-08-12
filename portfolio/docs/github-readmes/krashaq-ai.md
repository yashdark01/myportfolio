# Krashaq AI — Smart Farming Platform

**Multilingual AI platform** for Indian farmers — crop advisory, weather-driven irrigation guidance, supplier-managed subscriptions, and proactive alerts.

[![Live Demo](https://img.shields.io/badge/demo-live-10b981?style=flat-square)](https://krashaq-agritech.vercel.app)
[![Portfolio Case Study](https://img.shields.io/badge/case_study-read-10b981?style=flat-square)](https://yashpatidar.vercel.app/work/krashaq)

## Problem

Farmers need real-time crop advice in **Hindi, Hinglish, and English** — on mobile, with low bandwidth. Ag-input suppliers need a scalable way to license platform access and manage farmer subscriptions.

## What I Built

- **Next.js 16 monolith** — App Router UI + `/api/*` routes on Vercel (Mumbai)
- **LangGraph agent** — tool routing (weather, irrigation, KB search) with deduped fetches
- **Hybrid RAG** — keyword + vector search over MongoDB `kb_chunks` (RRF + MMR + category boost)
- **B2B2C platform** — admin licenses suppliers → suppliers sell farmer subscriptions
- **Alert cron** — supplier-created alerts delivered as in-app notifications (hourly Vercel cron)
- **53 Jest tests** — auth, RAG, agent graph, supplier APIs

## Architecture

```
Browser (Farmer / Supplier / Admin)
        ↓
Next.js 16 Monolith — Vercel (Mumbai)
  ├── LangGraph agent (Groq + multi-LLM fallback)
  ├── Hybrid RAG (keyword + vector, kb_chunks)
  ├── B2B2C RBAC (admin → supplier → farmer)
  └── Alert cron + in-app notifications
        ↓
MongoDB Atlas (+ optional Redis)
        ↓
Groq · OpenAI · Gemini · WeatherAPI
```

## Key Trade-offs

| Decision | Why |
|----------|-----|
| Monolith over split repos | One Vercel deploy, shared types, simpler auth |
| MongoDB hybrid RAG | Vectors co-located with app data; no Pinecone dependency |
| Groq + fallback chain | Low latency default; reliability when providers fail |
| In-app alerts first | Ship delivery loop before SMS/WhatsApp integrations |

## Links

- **Live Demo:** https://krashaq-agritech.vercel.app
- **Repo:** https://github.com/yashdark01/Krashaq-Ai
- **Case Study:** https://yashpatidar.vercel.app/work/krashaq
- **Author:** [Yash Patidar](https://yashpatidar.vercel.app)

## Tech Stack

`Next.js 16` · `TypeScript` · `MongoDB` · `LangGraph` · `Groq` · `Tailwind CSS` · `shadcn/ui` · `Jest` · `Vercel`

## Setup

```bash
git clone https://github.com/yashdark01/Krashaq-Ai.git
cd Krashaq-Ai
cp .env.example .env.local
npm install
npm run db:reset    # optional: demo users + KB corpus
npm run dev
```

## Author

**Yash Patidar** — Full Stack Engineer · IIIT Nagpur  
[Portfolio](https://yashpatidar.vercel.app) · [LinkedIn](https://linkedin.com/in/yash-patidar-97a8861b3)
