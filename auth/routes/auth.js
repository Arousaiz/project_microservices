const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const repository = require('../database/repository');
const { verify_password } = require('../services/services');
const verifyToken = require('../middleware/middleware');

const saltRounds = 10;
const Repository = new repository();

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user_db = await Repository.get_user_by_email(email);
        if (user_db) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = await Repository.create_user(email, password, saltRounds);;
        return res.status(201).json({ email: user.email, message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Repository.get_user_by_email(email);
        if (!user || !await verify_password(password, user.passwordHash)) {
            return res.status(400).json({ error: "Incorrect username or password" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).json({ email: user.email, token: token });
    } catch (error) {
        return res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await Repository.get_user_by_id(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ email: user.email, id: user.id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

module.exports = router;