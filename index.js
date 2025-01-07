// .env config
require('dotenv').config();

// Import necessary libraries
const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const expressSanitizer = require("express-sanitizer");
const { check, validationResult, body } = require('express-validator');

// Initialize express app
const app = express();
const port = process.env.PORT || 5500;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware Setup
app.use(express.static("public")); // Serve static files (CSS, JS, images)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(expressSanitizer()); // Sanitize user inputs
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Set up view engine (EJS)
app.set('view engine', 'ejs');

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
