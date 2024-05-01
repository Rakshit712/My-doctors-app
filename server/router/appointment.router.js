const express = require("express");
const { verifyToken } = require("../util/userAuthentication");
const { addApointment, getAppointment } = require("../controller/appointmentController");

const Router = express.Router();

Router.post("/",verifyToken,addApointment)
Router.get("/",verifyToken,getAppointment)

module.exports = Router;