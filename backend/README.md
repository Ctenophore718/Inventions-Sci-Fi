# Backend Deployment Guide

## Deploy to Railway.app (Recommended - Free Tier)

### Step 1: Prepare for Deployment

1. Sign up at https://railway.app (use GitHub login)
2. Install Railway CLI (optional): `npm install -g @railway/cli`

### Step 2: Deploy via Railway Dashboard

1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your `Inventions-Sci-Fi` repository
4. Railway will auto-detect the backend

### Step 3: Configure Environment Variables

In Railway dashboard, add these environment variables:
- `NODE_ENV` = `production`
- `JWT_SECRET` = `your-super-secret-jwt-key-change-this-to-random-string`
- `PORT` = `3001` (Railway sets this automatically, but confirm)

### Step 4: Configure Root Directory

Since the backend is in a subdirectory:
1. Go to Settings → "Root Directory"
2. Set to: `backend`
3. Click "Deploy"

### Step 5: Get Your Backend URL

After deployment:
1. Go to Settings → "Networking"
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://inventions-sci-fi-backend-production.up.railway.app`)

### Step 6: Update Frontend Environment Variable

Add to Cloudflare Pages environment variables:
- Variable name: `VITE_API_URL`
- Value: `https://your-railway-app-url.railway.app` (your actual URL from step 5)

### Alternative: Deploy to Render.com

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Set Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables (same as above)

## Testing

After deployment:
1. Test backend health: Visit `https://your-backend-url/api/health`
2. Should return: `{"status":"ok"}`
3. Frontend will automatically use the new backend URL

## Troubleshooting

- If Railway doesn't detect Node.js, ensure `package.json` is in `backend/` folder
- Check Railway logs for errors
- Ensure JWT_SECRET is set in production
- Test API endpoints with Postman or curl
