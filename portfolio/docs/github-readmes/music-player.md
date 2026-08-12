# Music Player — MERN Streaming Platform

Full-stack music streaming app with **Clerk auth**, **Redux Toolkit**, **ShadCN UI**, **Cloudinary admin uploads**, and **MongoDB aggregation** feeds.

[![Case Study](https://img.shields.io/badge/case_study-read-10b981?style=flat-square)](https://yashpatidar.vercel.app/work/music-player)

## Features

- Audio playback with queue, next/previous, play/pause
- Featured, Made for You, and Trending discovery sections
- Album pages with linked songs
- Clerk OAuth — sign in, session tokens, auto-refresh
- Admin upload/delete for songs & albums (Cloudinary + email gate)

## Tech stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite, Redux Toolkit, ShadCN UI, Clerk |
| Backend | Node.js, Express, MongoDB, Mongoose, Clerk Express SDK |
| Media | Cloudinary (admin uploads), static assets for seeded demo |

## Quick start

```bash
git clone https://github.com/yashdark01/Music-Player.git
cd Music-Player

cd server && cp .env.example .env && npm install && npm run dev
cd ../client && cp .env.example .env && npm install && npm run dev
```

- **App:** http://localhost:3000
- **API:** http://localhost:3001/api

See [docs/SETUP.md](https://github.com/yashdark01/Music-Player/blob/main/docs/SETUP.md) for Clerk, MongoDB, and Cloudinary setup.

## Highlights

- **Clerk auth** with per-route guards and admin email gating
- **Redux Toolkit** for predictable player queue and playback state
- **MongoDB aggregation** for discovery feeds without over-fetching
- **Admin CRUD** with Cloudinary media storage
- **Integration tests** for health check and auth-protected routes

---

[Yash Patidar](https://yashpatidar.vercel.app) · [Case Study](https://yashpatidar.vercel.app/work/music-player) · [GitHub](https://github.com/yashdark01/Music-Player)
