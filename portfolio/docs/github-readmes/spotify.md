# Spotify Clone — MERN Music Streaming Platform

Full-stack music streaming app with **JWT auth**, **Redux Toolkit**, **ShadCN UI**, and **MongoDB aggregation** pipelines.

[![Case Study](https://img.shields.io/badge/case_study-read-10b981?style=flat-square)](https://yashpatidar.vercel.app/work/music-player)

## Features

- User authentication (JWT + bcrypt)
- Play / pause, queue, and playlist management
- Trending songs + personalized recommendations
- MongoDB aggregation for efficient queries
- Audio caching layer (~25% faster repeat loads)
- Responsive UI with ShadCN + Tailwind CSS

## Tech Stack

`React` · `Node.js` · `Express` · `MongoDB` · `Redux Toolkit` · `ShadCN UI` · `Tailwind CSS`

## Architecture

```
React + ShadCN UI
      ↓
Redux Toolkit (player state)
      ↓
Express.js REST API
      ↓
JWT middleware
      ↓
MongoDB (users, songs, playlists)
```

## Setup

```bash
git clone https://github.com/yashdark01/spotify
cd spotify

# Backend
cd server && npm install && cp .env.example .env && npm run dev

# Frontend (new terminal)
cd client && npm install && npm run dev
```

## Key Decisions

- **Redux Toolkit** over Context for complex audio player state
- **Server-side aggregation** instead of shipping full song lists to client
- **JWT auth** with RBAC-ready structure for future admin roles

## Author

[Yash Patidar](https://yashpatidar.vercel.app) · [Case Study](https://yashpatidar.vercel.app/work/music-player)
