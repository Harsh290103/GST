const express = require('express');
const session = require('express-session');
const cors = require('cors');
const empRouterApp = require('./routes/emps');

const app = express();

// Enable CORS with credentials (allow React frontend at localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Parse JSON requests
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'lax',             // important for cookies with CORS
    secure: false,               // set to true if HTTPS is used
  }
}));

// Mount your routes from routes/emps.js
app.use('/emps', empRouterApp);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
