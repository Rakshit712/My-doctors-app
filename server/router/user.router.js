const express = require("express");
const { signUp, logIn,filterDoctors, changePassword } = require("../controller/userController");
const { verifyToken } = require("../util/userAuthentication");

const Router = express.Router();

Router.post("/register",signUp)
Router.post("/login", logIn)

Router.get("/doctors",filterDoctors)
Router.patch("/patient/:id",verifyToken,changePassword)


module.exports = Router;