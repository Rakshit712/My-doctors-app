const express = require("express");
const { verifyToken } = require("../util/userAuthentication");
const { getAppointment, deleteAppointment } = require("../controller/appointmentController");

const Router = express.Router();

Router.delete("/:id",verifyToken,deleteAppointment)
Router.get("/",verifyToken,getAppointment)

module.exports = Router;