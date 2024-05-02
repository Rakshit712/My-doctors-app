const User = require("../models/userModel");
const errorWrapper = require("../util/errorWrapper");

async function getAllDoctors(req,res){
try {
    const doctors = await User.find({"isDoctor": true});
    if(!doctors){
        return res.status(400).json(
            {
                status:"failure",
                message:"no doctor found",
            }
        )
    }
    else{
        res.status(200).json(
            {
                status:"success",
                message:"doctors found",
                total:doctors.length,
                data:doctors
            }
        )
    }
    
} catch (err) {
    throw {
        statusCode: err.statusCode || 500,
        status: err.status || "Something went wrong",
        message: err.message || "Internal server error"

    }
}
}

async function getDoctor(req,res){
try {
    const doctorId = req.params.id;
    
    const doctor = await User.findOne({"_id":doctorId})
    if(!doctor){
        return res.status(400).json(
            {
                status:"failure",
                message:"Doctor not found"
            }
        )
    }
    else{
        return res.status(200).json(
            {
                status:"success",
                message:"doctor found",
                data:doctor
            }
        )
    }
    
} catch (err) {
    throw {
        statusCode: err.statusCode || 500,
        status: err.status || "Something went wrong",
        message: err.message || "Internal server error"

    }
    
}
}

module.exports = {
    getAllDoctors:errorWrapper(getAllDoctors),
    getDoctor:errorWrapper(getDoctor)

}