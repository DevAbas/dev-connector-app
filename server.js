const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');
const port       = process.env.PORT || 5000;

// Load all api routes
const users   = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts   = require('./routes/api/posts');

// Initialize express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Listen port
app.listen(port, () => console.log(`App is runing on port ${port}`))