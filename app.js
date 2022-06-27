
// Padlock
require("dotenv").config();

// Importing packages
const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");         
const cors = require("cors");   
const cookieParser = require('cookie-parser');                                              
const app = express();

//Defining PORT
const PORT = process.env.APP_PORT || 1000;


//body-parser helps to grab input files from the frontend
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());


//Static file directory
const STATIC_DIR = express.static(path.join(__dirname, "/public"));
app.use(STATIC_DIR);

// Cors for linking to the frontend
const corsOption = {origin: ['http://localhost:3000']};


//Imported functions
const userRouter = require("./src/routes/userRoute");
const authRoute = require("./src/routes/authRoute");
const {dbConnection} = require("./dbConfig/db");


// Using the imported functions 
app.use(cors(corsOption));
app.use(userRouter);
app.use('/auth', authRoute);

dbConnection();

// Event listener
app.listen(PORT, ()=>{
    console.log("Server is listening to port", PORT);
});
