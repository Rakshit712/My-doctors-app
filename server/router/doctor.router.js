const express = require("express");
const { getAllDoctors, getDoctor, filterDoctors } = require("../controller/doctorController");

const Router = express.Router();

Router.get("/",getAllDoctors)
Router.get("/filter",filterDoctors)
Router.get("/:id",getDoctor)


module.exports = Router;