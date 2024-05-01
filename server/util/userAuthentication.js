const jwt = require("jsonwebtoken");
const Slot = require("../models/slotModel");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({
            status: "failure",
            message: "You are not authenticated"
        })

    }
    else {
        const token = authHeader.split(" ")[1];
        //console.log(token)
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: "failure",
                    message: "session expired... Please login again"
                })
            }
            else {
                req.user = user;
                next();
            }
        })
    }
}

const verifyTokenAndIsDoctor = (req, res, next) => {
    verifyToken(req, res, () => {
        //console.log(req.user.payload)
        if (req.user.payload.isDoctor) {
            next();
        }
        else {
            res.status(401).json(
                {
                    status: "failure",
                    message: "You are not allowed to do this task"
                }
            )
        }
    })
}

const verifyTokenAndAuthenticate = (req, res, next) => {
    verifyToken(req, res, async () => {

        const slot = await Slot.findById(req.params.id);
        if (!slot) {
            return res.status(404).json(
                {
                    status: "failure",
                    message: "slot does not exist"
                }
            )
        }
        const doctorId = slot.doctorId.toString();
        const userId = req.user.payload.userId;
        if (doctorId === userId && req.user.payload.isDoctor) {
            next()
        }
        else {
            return res.status(401).json(
                {
                    status: "failure",
                    message: "You are not authorized for this operation"
                }
            )
        }
    })
}

module.exports = { verifyToken, verifyTokenAndIsDoctor, verifyTokenAndAuthenticate }