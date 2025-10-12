# Inventions Sci-Fi Authentication System

This app now includes a full authentication system with backend server for cross-device character sheet syncing.

## Running Locally

### 1. Start the Backend Server

```bash
cd backend
npm install  # First time only
npm start
```

The backend server will run on `http://localhost:3001`

### 2. Start the Frontend

In a separate terminal:

```bash
npm install  # First time only
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if that's in use)

## Features

- **User Accounts**: Sign up and login with username/password
- **Cross-Device Syncing**: Character sheets are saved to the backend database and accessible from any device when logged in
- **Offline Support**: If not logged in, character sheets are saved locally in browser storage
- **Automatic Syncing**: All changes are automatically saved to the backend when authenticated

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite database
- JWT authentication
- bcrypt password hashing

**Frontend:**
- React + TypeScript
- Context API for auth state management
- Fetch API for backend communication

## Deployment

### Backend Deployment

The backend needs to be deployed to a Node.js hosting service like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS/GCP/Azure

**Environment Variables for Production:**
- `JWT_SECRET`: Strong random secret key for JWT tokens
- `NODE_ENV`: Set to `production`
- `PORT`: Will be provided by hosting service

### Frontend Deployment

The frontend can continue to be deployed on Cloudflare Pages.

**Environment Variable for Cloudflare:**
- `VITE_API_URL`: Set to your backend server URL (e.g., `https://your-backend.herokuapp.com`)

## Security Notes

- Passwords are hashed with bcrypt before storage
- JWT tokens expire after 30 days
- Backend uses CORS to allow frontend access
- Always use HTTPS in production
- Change the JWT_SECRET to a strong random value in production
