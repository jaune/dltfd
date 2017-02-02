const express = require('express');
var app = express();

// Env
require('dotenv').config({ silent: true });

// Settings
app.set('session name', 'session.name');

// Env to Settings
app.set('port', (process.env.PORT || 5000));
app.set('session secret', (process.env.SESSION_SECRET || 'session/secret'));

// HTTP access logger
const morgan = require('morgan');

app.use(morgan('tiny'));

// Use strong etag
app.set('etag', 'strong')

// Headers parsers
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// Session
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
  name: app.get('session name'),
  secret: app.get('session secret'),
  resave: true,
  saveUninitialized: true,
  store: new FileStore({
    path: path.join(__dirname , 'sessions')
  })
}));

// Passport
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

// Static
app.use(express.static(path.join(__dirname, 'node_modules', 'dltfd-client', 'dist', 'web')));

// Server routes
// app.get('/', function (req, res) {
//   res.send('Hello World !');
// });

// Server Side Rendering
app.use(require('./middlewares/ssr.js')());

// Error handling
app.use(require('./middlewares/error.js')());

// Start server
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
