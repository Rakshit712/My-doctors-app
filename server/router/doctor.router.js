const express = require("express");
const { getAllDoctors, getDoctor, filterDoctors } = require("../controller/doctorController");

const Router = express.Router();

Router.get("/",getAllDoctors)
Router.get("/:id",getDoctor)
Router.get("/filter",filterDoctors)

module.exports = Router;