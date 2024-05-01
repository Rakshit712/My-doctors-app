const Profile = require("../models/profileModel");
const errorWrapper = require("../util/errorWrapper");
const isValidProfileData = require("../util/profileValidator");


async function addProfile(req,res){
    try {
        const profileData = req.body;
        const userId = req.user.payload.userId;
        profileData.userId = userId;

        const alreadyExist = await Profile.findOne({userId:userId});
        if(alreadyExist){
            return res.status(403).json(
                {
                    status : "failure",
                    message : "Profile of this user already exist"
                    
                }
            )
        }

        const [isValidProfile,message] = isValidProfileData(profileData);
        if(!isValidProfile){
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }
        

        const newProfile = await Profile.create(profileData);
        if(newProfile){
            return res.status(201).json({
                status: "success",
                message: "Profile created successfully",
                data: newProfile
            })
        }else{
            return res.status(400).json({
                status: "failure",
                message: "Profile not created",
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

async function updateProfile(req,res){
    const id = req.params.id;
    const profileData = req.body;
    try {

        const [isValidProfile,message] = isValidProfileData(profileData);
        if(!isValidProfile){
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }

        const profile = await Profile.findByIdAndUpdate(id,profileData,{new:true});
        if(profile){
            return res.status(200).json({
                status: "success",
                message: "Profile updated successfully",
                data: profile
            })
        }else{
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

async function getProfile(req,res){
    try {
        const id  = req.params.id;

        const profile = await Profile.findById(id).populate("userId");
        if(profile){
            return res.status(200).json({
                status: "success",
                message: "Profile fetched successfully",
                data: profile
            })
        }else{
            return res.status(400).json({
                status:"failure",
                message:"failed to get profile"
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
    addProfile:errorWrapper(addProfile),
    updateProfile:errorWrapper(updateProfile),
    getProfile:errorWrapper(getProfile)


}