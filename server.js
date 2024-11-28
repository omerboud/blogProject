const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//session
app.use(session({
  secret: 'My only secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.use('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

app.use('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});



// Connect to MongoDB  
mongoose.connect(process.env.DB_CONNECTION).then(
    () => { console.log('Connected to MongoDB') },
    err => { console.log('Error connecting to MongoDB', err) }
);

// Routes
app.use('/users', require('./routes/user-routes'));

// Start the server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
