# Cookify

A full-stack recipe management app on the MERN stack (MongoDB, Express, React, Node.js).
Users sign up, log in, and manage their own private collection of recipes — create, view,
edit, and delete — through a clean, minimal-click interface.

## Stack
- **Frontend:** React (Create React App), React Router, MUI
- **Backend:** Node.js, Express, Mongoose
- **Auth:** JSON Web Tokens (bcrypt-hashed passwords)
- **Database:** MongoDB (Atlas in production)

## Architecture
The Express server serves both the JSON API (`/api/...`) and the compiled React app from
the same origin, so the frontend uses relative API paths — no CORS needed in production.

## Local development
1. `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and `SECRET`.
3. Run the API: `npm run server` (port 3001)
4. In a second terminal, run the React dev server: `npm start` (port 3000, proxies to 3001)

## Environment variables
| Key | Required | Description |
|-----|----------|-------------|
| `DATABASE_URL` | yes | MongoDB connection string (Atlas `mongodb+srv://...`) |
| `SECRET` | yes | Random string used to sign JWTs (`openssl rand -hex 32`) |
| `CLIENT_URL` | no | Comma-separated allowed CORS origins (dev only) |
| `PORT` | no | Server port (defaults to 3001; Render sets this) |

The server refuses to start if `DATABASE_URL` or `SECRET` is missing.

## Deploy (Render)
A `render.yaml` is included. Either connect the repo to Render (Blueprint) or create a
Web Service manually with:
- **Build command:** `npm install && npm run build`
- **Start command:** `node server.js`
- **Environment:** set `DATABASE_URL` (your Atlas string) and `SECRET`.

## Security notes
- Secrets live only in environment variables — never commit `.env`.
- All `/api/recipes` routes require a valid JWT; recipes are scoped to the owning user.
