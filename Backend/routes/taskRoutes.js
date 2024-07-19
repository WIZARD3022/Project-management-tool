const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Show all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Save task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        const saveResult = await task.save();
        res.send({ success: true, result: saveResult });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Delete task
router.delete('/', async (req, res) => {
    try {
        const deleteResult = await Task.deleteOne({ id: req.body.id });
        res.send({ success: true, result: deleteResult });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
