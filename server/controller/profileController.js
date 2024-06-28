const User = require("../models/userModel");
const errorWrapper = require("../util/errorWrapper");
const isValiduserData = require("../util/validator");


async function updateProfile(req, res) {
    const id = req.params.id;
    const userData = req.body;
    try {
        const [isValidProfile, message] = isValiduserData(userData);
        if (!isValidProfile) {
            return res.status(403).json({
                status: "invalid data",
                message
            });
        }

        // Separate profile fields from other fields
        const profileData = userData.profile;
        const otherFields = {};

        ['name', 'gender', 'dateOfBirth', 'contactNo', 'email'].forEach(field => {
            if (userData.hasOwnProperty(field)) {
                otherFields[field] = userData[field];
            }
        });

        // Update profile fields separately
        if (profileData) {
            const existingUser = await User.findById(id);
            const updatedProfile = { ...existingUser.profile.toObject(), ...profileData };

            await User.findByIdAndUpdate(
                id,
                { $set: { profile: updatedProfile } },
                { new: true }
            );
        }

        // Update other fields
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: otherFields },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({
                status: "success",
                message: "Profile updated successfully",
                data: updatedUser
            });
        } else {
            return res.status(400).json({
                status: "failure",
                message: "Profile not updated",
                data: null
            });
        }

    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error"
        });
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

module.exports  = {
    getProfile:errorWrapper(getProfile),
    updateProfile:errorWrapper(updateProfile),
    

}