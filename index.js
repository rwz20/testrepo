// .env config
require('dotenv').config();

// Import necessary libraries
const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const expressSanitizer = require("express-sanitizer");
const { check, validationResult, body } = require('express-validator');

// Initialize express app
const app = express();
const port = process.env.PORT || 8000;

// Set up view engine (EJS)
app.set('view engine', 'ejs');

// Middleware Setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static(__dirname + "public")); // Serve static files (CSS, JS, images)
app.use(express.json()); // Parse JSON data
app.use(expressSanitizer()); // Sanitize user inputs
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));



// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + db.threadId);
});
global.db = db


// Import routes
const apiRoutes = require('./routes/api');
const gameRoutes = require('./routes/game');

// Use routes
app.use('/api', apiRoutes); // API Routes
app.use('/game', gameRoutes); // Game Routes

// Default Route
app.get("/", (req, res) => {
    res.render("index");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
