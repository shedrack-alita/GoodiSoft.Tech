

// Importing the user model
const Course = require("../model/courseModel");
const Contact = require("../model/contactModel");
const register = require("../model/userModel");

// The user registration callback function
module.exports = {

    courses: async(req,res)=> {
        console.log(req.body);
        let {lastname, firstname, email, phone, gender, training, course} = req.body;

// User input validation
        let regexName = /^[\w][^0-9_!¡?÷?¿\s./\\+=@#$%ˆ&*(){}|~<>;\-:[\]]{1,30}$/;
        let regexEmail =  /(^[a-zA-Z0-9\.]{2,10})+@([\w-]+\.)+[\w-]{1,3}$/;
        let regexPhoneNo =  /(^(\+[0-9]{1,3}|0)[0-9]{3}( ){0,1}[0-9]{7,8}){1,11}\b/;
        let regexGender = /^((M|m)ale)$|^((F|f)emale)$/;
        let regexTtype = /^((O|o)nline)$|^(ONLINE)$|^((O|o)ffline)$|^(OFFLINE)$/;
        let regexCourse = /^[a-zA-Z\s]{1,50}$/;
        

            if (lastname.length<1) {
                return res.status(401).json({error: "Last name is required"});
            }
            if (!regexName.test(lastname)) {
                return res.status(401).json({error: "Name format not accepted"});
            }

            if (firstname.length<1) {
                return res.status(401).json({error: "First name is required"});
            }
            if (!regexName.test(firstname)) {
                return res.status(401).json({error: "Name format not accepted"});
            }

            if (email.length<1) {
                return res.status(401).json({error: "Email is required"});
            }
            if (!regexEmail.test(email)) {
                return res.status(401).json({error: "Invalid email address"});
            }

            if (phone.length<1) {
                return res.status(401).json({error: "Enter your phone number"});
            }
            if (!regexPhoneNo.test(phone)) {
                return res.status(401).json({error: "Invalid phone number"});
            }
            
            if (gender.length<1) {
                return res.status(401).json({error: "Gender field should not be empty"});
            }
            if (!regexGender.test(gender)) {
                return res.status(401).json({error: "Gender should be either male or female "});
            }

            if (training.length<1) {
                return res.status(401).json({error: "Choose your desired training type"});
            }
            if (!regexTtype.test(training)) {
                return res.status(401).json({error: "Training type should be either \"online\" or \"Offline\" no case sensitive"});
            }

            if (course.length<1) {
                return res.status(401).json({error: "Choose your desired course"});
            }
            if (!regexCourse.test(training)) {
                return res.status(401).json({error: "Choose from the list of courses on the academy list of courses"});
            }

            try {
            const userCourse = await Course.create({
                lastName: lastname,
                firstName: firstname,
                email: email,
                phone_no: phone,
                gender: gender,
                training_type: training,
                course: course
                })
                return res.status(200).json({data: userCourse});

            }catch (error) {
                return res.status(200).json({error});
            }
    },

    contact_Us: async(req,res)=> {
        console.log(req.body);
        let {fullname,email, phone, message} = req.body;

            let regexFullname = /^[a-zA-Z- ]{1,80}$/;
            let regexEmail =  /(^[a-zA-Z0-9\.]{2,10})+@([\w-]+\.)+[\w-]{1,3}$/;
            let regexPhoneNo =  /(^(\+[0-9]{1,3}|0)[0-9]{3}( ){0,1}[0-9]{7,8}){1,11}\b/;
            let regexMessage = /^[a-zA-Z0-9- \,.?"';:_/]{1,500}$/;

            if (fullname.length<1) {
                return res.status(401).json({error: "Your full name is required"});
            }
            if (!regexFullname.test(fullname)) {
                return res.status(401).json({error: "Name should contain only alphabets"});
            }

            if (email.length<1) {
                return res.status(401).json({error: "Your email is required"});
            }
            if (!regexEmail.test(email)) {
                return res.status(401).json({error: "Enter a valid email address"});
            }

            if (phone.length<1) {
                return res.status(401).json({error: "Your phone number is required"});
            }
            if (!regexPhoneNo.test(phone)) {
                return res.status(401).json({error: "Invalid phone number"});
            }

            if (message.length<1) {
                return res.status(401).json({error: "Your comment is important to us"});
            }
            if (!regexMessage.test(message)) {
                return res.status(401).json({error: "Your comment should be brief and concise"});
            }

            try {
                const user = await Contact.create({
                    fullName: fullname,
                    email: email,
                    phone_no: phone,
                    message: message,
                    });

                return res.status(200).json({data: user});

            }catch (error) {
                return res.status(200).json({error});
            }
    },
    
}