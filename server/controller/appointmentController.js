const Appointment = require("../models/appointmentModel");
const errorWrapper = require("../util/errorWrapper")

async function addApointment(req, res) {
    try {

        const appointmentData = req.body;
        const appointment = await Appointment.create(appointmentData);
        if (!appointment) {
            return res.status(400).json(
                {
                    status: "failure",
                    message: "error in creating new appoinment"
                }
            )
        }
        else {
            return res.status(201).json(
                {
                    status: "success",
                    message: "appointment created successfully",
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

async function getAppointment(req, res) {
    try {
        const patientId = req.query.patientId;

        const appointment = await Appointment.find({ patientId: patientId }).populate('patientId').populate("doctorId").populate("slotId").select('-createdAt -updatedAt');
        
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

module.exports = {

    addApointment: errorWrapper(addApointment),
    getAppointment: errorWrapper(getAppointment),


}