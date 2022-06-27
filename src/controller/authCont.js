
const User = require("../model/userModel");
const {error_Handler} = require("../helpers/errorHandler");

const jwt = require('jsonwebtoken');

module.exports = {

    register: async (req, res) =>{


        let {full_name, email, phone_no, password, confirm_pass} = req.body;

        
        let regexFullname = /^[a-zA-Z- ]{1,80}$/;
        let regexEmail =  /(^[a-zA-Z0-9\.]{2,10})+@([\w-]+\.)+[\w-]{1,3}$/;
        let regexPhoneNo =  /(^(\+[0-9]{1,3}|0)[0-9]{3}( ){0,1}[0-9]{7,8}){1,11}\b/;
        let regexPassword = /^([a-zA-Z0-9\@%$#&*?<>+=_\-*^!`~:;"',.]{6,})$/;

        if (full_name.length<1) {
            return res.status(401).json({error: "Your full name is required"});
        }
        if (!regexFullname.test(full_name)) {
            return res.status(401).json({error: "Name should contain only alphabets"});
        }

        if (email.length<1) {
            return res.status(401).json({error: "Your email is required"});
        }
        if (!regexEmail.test(email)) {
            return res.status(401).json({error: "Enter a valid email address"});
        }

        if (phone_no.length<1) {
            return res.status(401).json({error: "Your phone number is required"});
        }
        if (!regexPhoneNo.test(phone_no)) {
            return res.status(401).json({error: "Invalid phone number"});
        }

        if (password.length<1) {
            return res.status(401).json({error: "Create a strong password"});
        }
        if (!regexPassword.test(password)) {
            return res.status(401).json({error: "Password must contain alphanumeric characters with both upper and lower case, and some symbols"});
        }

        if (confirm_pass !== password) {
            return res.status(401).json({error: "Incorrect password"});
        }

        try {
            const _user = await User.create({
                full_name: full_name,
                email: email,
                phone_no: phone_no,
                password: password,
            })
                
            // console.log(_user);

            const token = jwt.sign({encod: _user._id}, process.env.SECRETE, {expiresIn: 60*60*24*1000});
            console.log(token)

            res.cookie('token', token, 60*60*24*1000);
            
            // console.log("New user has registered: ", user)
            return res.status(200).json({success: 'Account created successfully'});
    
            }catch (err) {
               let error = error_Handler(err);
               console.log(error)
               return res.status(200).json({error});
            }
    },


    // Login 
    login: async (req,res)=>{
        let {email, password} = req.body;

        let regexAB = /^([a-z0-9]+@[a-z]+\.[a-z]{3})$\b/
        let regexPassword = /^([a-zA-Z0-9\@%$#&*?<>+=_\-*^!`~:;"',.]{6,})$/;

        if (email<1) {
            return res.status(401).json({error: "Email shouldn't be empty"});
        }
        if (!regexAB.test(email)) {
            return res.status(401).json({error: "Invalid email address"});
        }

        if (password.length<1) {
            return res.status(401).json({error: "Enter your password"});
        }
        if (!regexPassword.test(password)) {
            return res.status(401).json({error: "Incorrect password!"});
        }

        try {
            const u = await User.login(email, password);
            // console.log(u);
            const token = jwt.sign({encod: u._id}, process.env.SECRETE, {expiresIn: 60*60*24*1000});
            console.log(token)

            res.cookie('token', token, 60*60*24*1000);
            
            return res.status(200).json({Success: "Login successfull"});
        } catch (err) {
            let error = error_Handler(err);
            console.log(error);
            return res.status(401).json({error});
        }        
       
    }
}