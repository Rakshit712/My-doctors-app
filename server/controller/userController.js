const User = require("../models/userModel");
const isValiduserData = require("../util/validator");
const generateToken = require("../util/generateToken");
const errorWrapper = require("../util/errorWrapper");
const bcrypt = require("bcrypt");
const Speciality = require("../models/specialityModel");


async function signUp(req, res) {
    try {
        const userData = req.body;

        //console.log(userData)
        const userExist = await User.findOne({ email: userData.email });
        if (userExist) {
            return res.status(400).json({
                status: "User already exist",
                message: "User with this email already exist"
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
        token: token,
        data:user
        
    })
}


async function updateProfile(req, res) {
    const id = req.params.id;
    const userData = req.body;
    try {

        const [isValidProfile, message] = isValiduserData(userData);
        if (!isValidProfile) {
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }


        const profileData = userData.profile;
        const otherFields = {};

        ['name', 'gender', 'dateOfBirth', 'contactNo', 'email'].forEach(field => {
            if (userData.hasOwnProperty(field)) {
                otherFields[field] = userData[field];
            }
        });
        const updatedProfile = await User.findByIdAndUpdate(
            id,
            { $set: { profile: profileData } },

            { new: true }
        );
        await User.findByIdAndUpdate(
            id,
            { $set: otherFields },
            { new: true }
        );

        if (updatedProfile) {
            return res.status(200).json({
                status: "success",
                message: "Profile updated successfully",
                data: updatedProfile
            })
        } else {
            return res.status(400).json({
                status: "failure",
                message: "Profile not updated",
                data: null
            })
        }

    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }

}

async function getProfile(req, res) {
    try {
        const id = req.params.id;

        const profile = await User.findById(id).populate("profile.specialities");
        if (profile) {
            return res.status(200).json({
                status: "success",
                message: "Profile fetched successfully",
                data: profile
            })
        } else {
            return res.status(400).json({
                status: "failure",
                message: "failed to get profile"
            })
        }


    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"

        }
    }
}


async function filterDoctors(req, res) {
    try {
        const speciality = req.query.speciality;
        let name = req.query.name ? new RegExp(req.query.name, "i") : null;

        let filter = {};
        filter["isDoctor"] = true;
        if (speciality) {
            const specks = await Speciality.findOne({ name: { $regex: speciality, $options: 'i' } });
            if (!specks) {
                return res.status(404).json({
                    status: "failure",
                    message: "No such speciality found"
                });
            }
            filter["profile.specialities"] = specks._id.toString();
            
        }

        if (name) {
            filter["name"] = name;
            
        }
        console.log(filter)
        const doctors = await User.find(filter).populate("profile.specialities");

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({
                status: "failure",
                message: "Doctors not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Doctors found",
            total: doctors.length,
            data: doctors
        });
    } catch (err) {
       // console.error(err);
       throw {
        statusCode: err.statusCode || 500,
        status: err.status || "Something went wrong",
        message: err.message || "Internal server error"

    }
    }
}

async function changePassword(req,res){
    try {
        const id = req.params.id;
        const { oldPassword, newPassword } = req.body;
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
        Password = await bcrypt.hash(newPassword, 10);
        user.password = Password;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Password changed successfully"
        })

        
        
        
    } catch (err) {
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
    updateProfile: errorWrapper(updateProfile),
    getProfile: errorWrapper(getProfile),
    filterDoctors: errorWrapper(filterDoctors),
    changePassword : errorWrapper(changePassword),
   

}
