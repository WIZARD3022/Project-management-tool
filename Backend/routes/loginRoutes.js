const express = require('express');
const Login = require('../models/Login');

const router = express.Router();

// Show all logins
router.get('/', async (req, res) => {
    try {
        const logins = await Login.find({});
        res.json(logins);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Save login (registration)
router.post('/', async (req, res) => {
    try {
        const login = new Login(req.body);
        const saveResult = await login.save();
        res.status(201).send({ success: true, result: saveResult });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ error: 'Login fail' });
        } else {
            res.status(400).send(err);
        }
    }
});

module.exports = router;