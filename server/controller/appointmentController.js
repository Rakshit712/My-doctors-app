const Appointment = require("../models/appointmentModel");
const errorWrapper = require("../util/errorWrapper")



async function getAppointment(req, res) {
    try {
        const patientId = req.query.patientId;
        const doctorId = req.query.doctorId;
        let appointment;
    if(patientId){
        appointment = await Appointment.find({ patientId: patientId }).populate('patientId').populate("doctorId").populate("slotId").select('-createdAt -updatedAt');
    }
    else{
        appointment = await Appointment.find({ doctorId: doctorId }).populate('patientId').populate("doctorId").populate("slotId").select('-createdAt -updatedAt');
        
    } 
    
    if (appointment.length === 0) {
        return res.status(400).json(
            {
                status: "failure",
                message: "No appointments found for this user"
            }
        )
    }
    else {
        return res.status(200).json(
            {
                status: "success",
                message: "Appointments fetched successfully",
                total: appointment.length,
                data: appointment
            }
        )
    }
    


    } catch (err) {
        throw {
            statusCode: err.statusCode || 500,
            status: err.status || "Something went wrong",
            message: err.message || "Internal server error",


        }
    }
}

async function deleteAppointment(req, res){
    try {
        const appoinmentId = req.params.id;
        const appointment = await Appointment.findByIdAndDelete(appoinmentId);
        if(appointment){
            res.status(200).json(
                {
                    status: "success",
                    message: "Appointment deleted successfully",
                    data: appointment
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


    getAppointment: errorWrapper(getAppointment),
    deleteAppointment:errorWrapper(deleteAppointment),

}