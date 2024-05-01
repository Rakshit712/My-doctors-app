const mongoose = require("mongoose");
const User = require("./userModel");
const Slot = require("./slotModel");

const appointmentSchema = mongoose.Schema(
    {
        patientId:{
            type:mongoose.Schema.ObjectId,
            ref: User,
            required:true
        },
        doctorId:{
            type:mongoose.Schema.ObjectId,
            ref:User,
            required:true
        },
        slotId: {
            type: mongoose.Schema.ObjectId,
            ref: Slot,
            required:true
        },
        appointmentStatus:{
            type:String,
            enum:["NOT_STARTED","STARTED","COMPLETED"],
            default: "NOT_STARTED"
        },
        deleted:{
            type:Boolean,
            default:false
        },},
        {timestamps : true}
    
)

const Appointment = mongoose.model("Appointment",appointmentSchema);
module.exports = Appointment;
