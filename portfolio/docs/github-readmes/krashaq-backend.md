# Krashaq Backend — Deprecated

> **This repo is deprecated.** The production backend is now part of the [Krashaq-Ai](https://github.com/yashdark01/Krashaq-Ai) Next.js monolith.

The legacy Python FastAPI backend (Ollama, Twilio WhatsApp, LangChain router) was archived and removed from the main codebase. Recover from git tag `legacy/python-backend-v1` in the Krashaq-Ai repo if needed.

## Current architecture

| Layer | Location |
|-------|----------|
| UI + API routes | `Krashaq-Ai/src/app/` |
| LangGraph agent + RAG | `Krashaq-Ai/src/lib/server/` |
| KB corpus | `Krashaq-Ai/content/kb/` |

## Links

- **Monolith repo:** https://github.com/yashdark01/Krashaq-Ai
- **Live demo:** https://krashaq-agritech.vercel.app
- **Case study:** https://yashpatidar.vercel.app/work/krashaq
