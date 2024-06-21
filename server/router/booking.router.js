const express = require("express");
const { verifyToken } = require("../util/userAuthentication");
const payment = require("../controller/bookingController");


const Router = express.Router();


Router.post("/",verifyToken,payment)

module.exports = Router;