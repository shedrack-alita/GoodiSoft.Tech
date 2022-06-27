
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    full_name:{
        type: String,
        required: [true,  'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'A valid email address is required'],
        unique: true
    },
    phone_no: {
        type: String,
        required: [true, 'Type in your phone number'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    admin: {
        type: Boolean,
        default: false,
    },
    superAdmin: {
        type: Boolean,
        default: false
    },
    Date: {
        type: String,
        default: Date.now
    }
});

userSchema.pre('save', async function(){
    let _salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, _salt);
})    

// Ligin static method
userSchema.statics.login = async function(email, password) {

    // Get data from the ddb
    const _u  = await this.findOne({email});
    console.log(_u)

    if (_u) {
        const auth = await bcrypt.compare(password, _u.password);
        console.log(auth)

        if (auth) {
            return _u;
        }
        throw Error('Incorrect login details');
    }
    throw Error('Incorrect login details');
}


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;