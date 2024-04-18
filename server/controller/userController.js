const User = require("../models/userModel");
const isValiduserData = require("../util/validator");
const generateToken = require("../util/generateToken");
const errorWrapper = require("../util/errorWrapper");
const bcrypt = require("bcrypt");

async function signUp(req,res){
    try {
        const userData = req.body;
        //console.log(userData)
        const userExist = await User.findOne({email:userData.email});
        if(userExist){
            return res.status(400).json({
                status:"User already exist",
                message:"User with this email already exist"
            })
        }

        const [isValidUser,message] = isValiduserData(userData);
        if(!isValidUser){
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }
        userData.password = await bcrypt.hash(userData.password,10) ;
        const user = await User.create(userData);
        return res.status(201).json({
            status: "User created successfully",
            user
        })
        

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(403).json({
                status: err.message,
                message: err.message
            });
        } return res.status(err.statusCode || 500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });
    }
}

async function logIn(req,res){
    
        const {identifier, password} = req.body;

        if(!identifier|| !password){
            return res.status(400).json({
                status: "Bad request",
                message: "Please provide indentifier and password"
            })
        }

        const user =  await User.findOne({ $or: [{ email: identifier }, { contactNo: identifier }] });
        if(!user){
            throw {
                statusCode: 403,
                status: "Login failure",
                message: "User is not signed in"
    
            }
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            throw {
                statusCode: 401,
                status: 'Login Failure',
                message: "Wrong Password"
    
            }
    
        }

        const token  = generateToken({
            userId : user._id,
            isDoctor: user.isDoctor,
            isAdmin: user.isAdmin
        })
       // console.log(token)
        res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            token: token,
        })

        
    
}
module.exports = {
    signUp: errorWrapper(signUp)
    ,logIn: errorWrapper(logIn),
}
