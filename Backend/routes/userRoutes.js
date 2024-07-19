const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Show all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Save user (registration)
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const saveResult = await user.save();
        res.status(201).send({ success: true, result: saveResult });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ error: 'Contact_num must be exactly 10 characters long.' });
        } else {
            res.status(400).send(err);
        }
    }
});

module.exports = router;