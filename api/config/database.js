const DATABASE_URL = process.env.DATABASE_URL;
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/recipes', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// shortcut to mongoose.connection object
const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
