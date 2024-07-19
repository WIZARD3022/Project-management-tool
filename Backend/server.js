const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
const port = 3000;

// Load environment variables
dotenv.config();

// Ensure that you have a .env file with the correct DB_URI
const DB_URI = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(DB_URI)
    .then(() => console.log('Connection Successful'))
    .catch((err) => console.log('Connection Rejected', err));

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// Use routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});