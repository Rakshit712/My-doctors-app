const mongoose = require("mongoose");
const User = require("./userModel");

const slotSchema = mongoose.Schema(
    {
        startTime:{
            type:Date,
            required:[true,"Please provide the start time"]
        },
        endTime:{
            type:Date,
            required:[true,"please provide the end time"]
        },
        doctorId:{
            type: mongoose.Schema.ObjectId,
            ref: User,
            required: true
        },
        size:{
            type:Number,
            default:1
        },
        count:{
            type:Number,
            default:0
        },
        isBooked:{
            type:Boolean,
            default:false
        }

    }
)
const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;