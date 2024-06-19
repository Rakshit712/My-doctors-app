const User = require("../models/userModel");
const isValiduserData = require("../util/validator");
const generateToken = require("../util/generateToken");
const errorWrapper = require("../util/errorWrapper");
const bcrypt = require("bcrypt");
const Speciality = require("../models/specialityModel");
const isValiduserPassword = require("../util/passwordValidator")



async function signUp(req, res) {
    try {
        const userData = req.body;
    
        //console.log(userData)
        let userExist = await User.findOne({ email: userData.email });
        if (userExist) {
            return res.status(400).json({
                status: "User already exist",
                message: "User with this email already exist"
            })
        }
        userExist = await User.findOne({ contactNo: userData.contactNo});
        if(userExist){
            return res.status(400).json({
                status:"User already exist",
                message:"User with this contact number already exist"
            })
        }


        const [isValidUser, message] = isValiduserData(userData);
        if (!isValidUser) {
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }
        userData.password = await bcrypt.hash(userData.password, 10);
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

async function logIn(req, res) {

    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({
            status: "Bad request",
            message: "Please provide indentifier and password"
        })
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { contactNo: identifier }] });
    if (!user) {
        throw {
            statusCode: 403,
            status: "Login failure",
            message: "User is not signed in"

        }
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw {
            statusCode: 401,
            status: 'Login Failure',
            message: "Wrong Password"

        }

    }

    const token = generateToken({
        userId: user._id,
        isDoctor: user.isDoctor,
        isAdmin: user.isAdmin
    })
    // console.log(token)
    res.status(200).json({
        status: "Success",
        message: "User logged in successfully",
        data:{
            token:token,
            user:user,
            isDoctor:user.isDoctor,
            
        }
        
    })
}



async function validateEmailAndContactNumber(req, res) {
    try {
        const { email, contactNo } = req.body;

        if (email) {
            const emailExist = await User.findOne({ email: email });
            if (emailExist) {
                return res.status(400).json({
                    status: "User already exist",
                    message: "User with this email already exist"
                });
            }
            else{
                return res.status(200).json({
                    status: "success",
                    message: "Good to go, User with email or contact number does not exist"
                });
            }
        }

        if (contactNo) {
            const contactExist = await User.findOne({ contactNo: contactNo });
            if (contactExist) {
                return res.status(400).json({
                    status: "User already exist",
                    message: "User with this contact number already exist"
                });
            }
            else {
                return res.status(200).json({
                    status: "success",
                    message: "Good to go, User with email or contact number does not exist"
                });
            }
        }

       

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });
    }
}



async function changePassword(req,res){
    try {
        const id = req.params.id;
        const { oldPassword, newPassword } = req.body;
        if(oldPassword===newPassword){
            return res.status(400).json({
                status: "failure",
                message: "Old and new password cannot be same"
            });
        }
        const user = await User.findById(id);
        if (!user) {
            throw {
                statusCode: 404,
                status: "fail",
                message: "User not found"
            }
        }
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        
        if (!isPasswordCorrect) {
            throw {
                statusCode: 401,
                status: 'Login Failure',
                message: "Wrong old Password"

            }

        }
        console.log(newPassword)
        const [isValidPassword, message] = isValiduserPassword(newPassword);
        console.log(isValidPassword)
        if (!isValidPassword) {
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }
        Password = await bcrypt.hash(newPassword, 10);
        user.password = Password;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Password changed successfully"
        })

        
        
        
    } catch (err) {
        console.log(err);
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }
}


module.exports = {
    signUp: errorWrapper(signUp)
    , logIn: errorWrapper(logIn),
    changePassword : errorWrapper(changePassword),
    validateEmailAndCotactNumber:errorWrapper(validateEmailAndContactNumber)
   

}
