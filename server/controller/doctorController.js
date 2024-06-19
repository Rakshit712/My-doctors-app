const Speciality = require("../models/specialityModel");
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
    
    const doctor = await User.findOne({"_id":doctorId}).populate("profile.specialities")
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

module.exports = {
    getAllDoctors:errorWrapper(getAllDoctors),
    getDoctor:errorWrapper(getDoctor),
    filterDoctors:errorWrapper(filterDoctors),

}