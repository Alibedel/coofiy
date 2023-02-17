const DATABASE_URL = "mongodb+srv://ali1998:Legendog98@cluster0.ovejytq.mongodb.net/recipes?retryWrites=true&w=majority"
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