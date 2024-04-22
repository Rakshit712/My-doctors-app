const express = require("express");
const { addSlot, deleteSlot } = require("../controller/slotController");
const { verifyTokenAndIsDoctor, verifyTokenAndAuthenticate } = require("../util/userAuthentication");

const Router = express.Router();

Router.post("/",verifyTokenAndIsDoctor,addSlot)
Router.delete("/:id", verifyTokenAndAuthenticate,deleteSlot)


module.exports = Router;