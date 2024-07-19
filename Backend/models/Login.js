const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
    },
    LoginDate: {
        type: Date,
        default: Date.now
    },
    LoginTime: {
        type: String,
        default: getTimeNow
    },
    Access:{
        type: String,
    }
});

function getTimeNow() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${sec}`;
};

module.exports = mongoose.model('Login', userSchema);
