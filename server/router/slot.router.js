const express = require("express");
const { addSlot, deleteSlot, getSlot } = require("../controller/slotController");
const { verifyTokenAndIsDoctor, verifyTokenAndAuthenticate, verifyToken } = require("../util/userAuthentication");

const Router = express.Router();

Router.post("/",verifyTokenAndIsDoctor,addSlot)
Router.delete("/:id", verifyTokenAndAuthenticate,deleteSlot)
Router.get("/doctor/:id",getSlot)

module.exports = Router;