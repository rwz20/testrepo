const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const request = require('request');

// MySQL connection (imported from index.js)
const db = require('../db.js');

// Example API endpoint: Get all items from the database
router.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            res.status(500).json({ message: "Database error", error: err });
        } else {
            res.json(results);
        }
    });
});

// Example API endpoint: Fetch data from a public API
router.get('/weather', (req, res) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = req.query.city || 'London'; // Default to London
    const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    
    request(weatherApiUrl, (err, response, body) => {
        if (err) {
            res.status(500).json({ message: "Weather API error", error: err });
        } else {
            res.json(JSON.parse(body));
        }
    });
});

module.exports = router;
