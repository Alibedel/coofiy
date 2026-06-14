require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

// Fail fast if required secrets are missing
['DATABASE_URL', 'SECRET'].forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

require('./api/config/database');

const usersRouter = require('./api/routes/users');
const recipesRouter = require('./api/routes/recipes');

const app = express();

// Restrict CORS to known client origins (comma-separated CLIENT_URL, or localhost in dev)
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000').split(',');
app.use(cors({ origin: allowedOrigins }));

app.use(logger('dev'));
app.use(express.json());

// Decode JWT (if present) on every request, before the routes
app.use(require('./api/config/auth'));

app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);

// Serve the compiled React app
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
