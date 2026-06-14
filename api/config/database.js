const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.set('strictQuery', true);

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function (err) {
  console.error('MongoDB connection error:', err.message);
});
