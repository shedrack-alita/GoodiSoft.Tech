
const mongoose = require("mongoose");
const dbConnection = ()=>{
        mongoose.connect("mongodb://localhost:27017/GoodiSoft");
        if (dbConnection) {
            console.log("connected")
        }
        else{
            console.log("Error in connection");
        }
}
module.exports = {dbConnection};