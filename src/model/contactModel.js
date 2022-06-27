

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    fullName:{
        type: String,
        required: [true,  'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'A valid email address is required']
    },
    phone_no: {
        type: String,
        required: [true, 'Type in your phone number']
    },
    message:{
        type: String,
        required: [true, 'Your comment is required']
    },
    Date: {
        type: String,
        default: Date.now
    }
});
const contact_Schema = mongoose.model("contact", contactSchema);
module.exports = contact_Schema;