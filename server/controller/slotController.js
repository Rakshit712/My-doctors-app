const Slot = require("../models/slotModel");
const errorWrapper = require("../util/errorWrapper");

async function addSlot(req, res) {
    try {
        const slotData = req.body;
        const doctorId = req.user.payload.userId;
        slotData.doctorId = doctorId;

        const startTime = slotData.startTime;
        const endTime = slotData.endTime;
        
        const existingSlot = await Slot.findOne({
            doctorId: doctorId,
            $or: [
                { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
                { startTime: { $lte: endTime }, endTime: { $gte: endTime } }
            ]
        });
        
        if (existingSlot) {
            return res.status(400).json({
                status: "failure",
                message: "failed to create a new slot as the slot already exist at3 the selected time"
            })
        }
        const newSlot = await Slot.create(slotData);
        if (newSlot) {
            return res.status(201).json({
                status: "success",
                message: "new slot created successfully",
                data: newSlot
            })
        }
        else {
            return res.status(400).json({
                status: "failure",
                message: "slot not created"
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

async function deleteSlot(req, res) {

    try {
        const { id } = req.params;
        const slot = await Slot.findByIdAndDelete(id);
        if (!slot) {
            return res.status(409).json({
                status: "failure",
                message: "slot not found"
            })
        }
        else {
            return res.status(200).json({
                status: "success",
                message: "slot deleted successfully"
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
module.exports = {
    addSlot: errorWrapper(addSlot)
    , deleteSlot: errorWrapper(deleteSlot)

}