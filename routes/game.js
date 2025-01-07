const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator');

// MySQL connection (imported from index.js)
const db = require('../db');

// Game home page
router.get("/", (req, res) => {
    res.render("game/home");
});

// Register route
router.get("/register", (req, res) => {
    res.render("game/register");
});

router.post("/register", [
    check('username').isLength({ min: 3 }).withMessage('Username should be at least 3 characters'),
    check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('game/register', { errors: errors.array() });
    }

    const { username, password } = req.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error hashing password.");
        }

        // Save user to the database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send("Error saving user to the database.");
            }
            res.redirect("/game/login");
        });
    });
});

// Login route
router.get("/login", (req, res) => {
    res.render("game/login");
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send("User not found.");
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                req.session.user = user;
                res.redirect("/game/home");
            } else {
                res.status(401).send("Incorrect password.");
            }
        });
    });
});

module.exports = router;
