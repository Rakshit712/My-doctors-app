const express = require("express");
const { getAllDoctors, getDoctor } = require("../controller/doctorController");

const Router = express.Router();

Router.get("/",getAllDoctors)
Router.get("/:id",getDoctor)

module.exports = Router;