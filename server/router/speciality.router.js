const express = require("express");
const {  getSpeciality } = require("../controller/specialityController");


const Router = express.Router();



Router.get("/",getSpeciality)

module.exports = Router;