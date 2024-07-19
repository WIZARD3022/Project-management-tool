const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Task: {
        type:String,
        require:true,
    },
    Start: {
        type:String,
        require:true,
    },
    Deadline: {
        type:String,
        require:true,
    },
    Assign: {
        type:String,
        require:true,
    },
    Day: {
        type:Number,
        require:true,
    },
    Progress: {
        type:Number,
        require:true,
    },
    Manager: {
        type:String,
        require:true,
    },
    id: {
        type:String,
        require:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creationTime: {
        type: String,
        default: getTimeNow
    },
});

function getTimeNow() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${sec}`;
};

module.exports = mongoose.model('Task', taskSchema);
