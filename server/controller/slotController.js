const Slot = require("../models/slotModel");
const errorWrapper = require("../util/errorWrapper");
const isValidSlotDetails = require("../util/slotValidator");


async function addSlot(req, res) {
    try {
        const slotData = req.body;
        const doctorId = req.user.payload.userId;
        slotData.doctorId = doctorId;

        const startTime = slotData.startTime;
        const endTime = slotData.endTime;

        const [isValidSlot, message] = isValidSlotDetails(slotData);
        if (!isValidSlot) {
            return res.status(403).json({
                status: "invaled data",
                message
            })
        }

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

async function getSlot(req, res) {
    try {
        const doctorId = req.params.id;
        const slots = await Slot.find({ doctorId: doctorId });

        if (!slots || slots.length === 0) {
            return res.status(400).json({
                status: "failure",
                message: "No slot found for this doctor"
            });
        }

        const slotData = [];

        slots.forEach(slot => {
            if (slot.count < slot.size) {
                slotData.push(slot);
            }
        });

        if (slotData.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "All slots are booked.",
                data: []
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "Slots fetched successfully",
                total: slotData.length,
                data: slotData
            });
        }

    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: "failure",
            message: err.message || "Internal server error"
        });
    }
}


module.exports = {
    addSlot: errorWrapper(addSlot)
    , deleteSlot: errorWrapper(deleteSlot),
    getSlot: errorWrapper(getSlot)

}