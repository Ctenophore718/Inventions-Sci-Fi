# 🚀 Deployment Guide — Cloudflare Pages Functions + D1 (free)

This app now uses Cloudflare Pages Functions as the backend and D1 (SQLite) for storage, all on the same origin. That fixes mobile “load failed” by avoiding localhost and CORS.

## What you’ll get
- Same-origin API at /api (e.g., /api/auth/login, /api/sheets)
- Free D1 database for accounts and character sheets
- No separate backend hosting needed

## 1) Create the D1 database
1. Go to Cloudflare Dashboard → Workers & Pages → D1
2. Create Database
   - Name: inventions-sheets (any name is fine)
3. Note the database name; you’ll bind it as DB next.

## 2) Bind D1 to your Pages project
1. Go to Workers & Pages → your Pages project (inventions-sci-fi)
2. Settings → Functions → D1 Databases → Add binding
   - Variable name: DB
   - Database: inventions-sheets (pick the DB you created)
3. Save.

Schema is created automatically on first request by the functions (ensureSchema).

## 3) Build and deploy the site
If your Pages project is already connected to this repo, just trigger a deploy:
- Push any commit to main, or
- In Cloudflare Pages → Deployments → Retry latest

No .env is required for the API because it runs same-origin. The frontend is already set to call relative /api paths by default.

## 4) Verify endpoints
From the live site origin:
- GET /api/auth/verify (requires Authorization header)
- POST /api/auth/signup { username, password }
- POST /api/auth/login { username, password }
- GET /api/sheets (with Authorization)
- POST /api/sheets (with Authorization)
- DELETE /api/sheets/:id (with Authorization)

Tip: You can test quickly in your browser DevTools Console using fetch.

## 5) Local development options (optional)
You have two paths:

Option A — Keep using the local Node/Express backend in /backend for dev
- Start it locally and set VITE_API_URL (only for local dev)
- On Cloudflare, leave VITE_API_URL empty so production uses /api

Option B — Use Wrangler to run Pages Functions locally
1. Install Wrangler (one time): npm i -g wrangler
2. Run: wrangler pages dev --persist
3. This will serve your functions at /api and a local D1; great for end-to-end dev

## 6) iPad/iPhone testing
Open your Cloudflare Pages URL (e.g., https://inventions-sci-fi.pages.dev) and login. Create/update/delete a character; it should sync across devices.

## Troubleshooting
- 401 Unauthorized on API: Make sure you’re logged in; token is stored in localStorage and sent via Authorization: Bearer
- D1 not bound: In Cloudflare Pages → Functions → D1 Databases, ensure the binding name is DB
- TypeScript errors in functions locally: We added // @ts-nocheck in function files to avoid type issues in this repo; Cloudflare compiles functions fine on deploy

---

Previous instructions for Railway have been removed in favor of an all-Cloudflare setup that stays free.
