const Speciality   = require("../models/specialityModel");
const errorWrapper = require("../util/errorWrapper");


async function getSpeciality(req,res){
    try {

        const specialities = await Speciality.find();
        if(!specialities){
            return res.status(400).json(
                {
                    status: "failure",
                    message: "Speciality not found"
                }
            )
        }
        else{
            return res.status(200).json(
                {
                    status: "success",
                    message: "Speciality found",
                    data: specialities
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
    getSpeciality:errorWrapper(getSpeciality),

}