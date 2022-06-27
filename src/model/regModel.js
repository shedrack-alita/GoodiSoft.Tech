

const mongoose = require("mongoose");

const register_Schema = new mongoose.Schema({

    lastName:{
        type: String,
        required: [true,  'Last name is required']
    },
    firstName:{
        type: String,
        required: [true,  'First name is required']
    },
    email: {
        type: String,
        required: [true, 'A valid email address is required']
    },
    phone_no: {
        type: String,
        required: [true, 'Type in your phone number']
    },
    gender:{
        type: String,
        required: [true, 'Identify your gender']
    },
    training_type: {
        type: String,
        required: [true, 'Input your training type']
    },
    course: {
        type: String,
        required: [true, 'select your desired course']
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const register_Model = mongoose.model("register", register_Schema);
module.exports = register_Model;