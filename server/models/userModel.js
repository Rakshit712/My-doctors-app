const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your full name"]
    },
    gender:{
        type:String,
        required:[true,"Please provide your gender"]
    },
    dateOfBirth:{
        type:Date,
    },
    contactNo:{
        type:String,
        required:[true,"Please provide your mobile number"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    password:{
        type:String,
        reuired:true
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,

    }
    
})

const User = mongoose.model("user",userSchema);
module.exports = User;