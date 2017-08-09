// Load database schemas first
require('./models/User');
// Just require the passport file - we don't need to use it in this file
require('./services/passport');

const cookieSession = require('cookie-session');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const app = express();

// Middleware functions
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
