const mongoose = require('mongoose');
const passwordValidator = require('password-validator');

const passwordSchemaValidator = new passwordValidator();

passwordSchemaValidator
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .not().spaces();

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return passwordSchemaValidator.validate(v);
            },
            message: props => `${props.value} is not a valid password!`
        }
    },
    Email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    Name: {
        type: String,
        require: true,
    },
    DOB: {
        type: String,
        require: true,
    },
    Contact_num: {
        type: String,
        validate: {
            validator: function(v) {
                return v.length === 10;
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    creationDate: {
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

module.exports = mongoose.model('User', userSchema);
