const express = require("express");
const { signUp, logIn, getProfile, updateProfile, filterDoctors, changePassword } = require("../controller/userController");
const { verifyToken } = require("../util/userAuthentication");

const Router = express.Router();

Router.post("/register",signUp)
Router.post("/login", logIn)
Router.patch("/profile/:id",verifyToken,updateProfile)
Router.get("/profile/:id",verifyToken,getProfile)
Router.get("/doctors",filterDoctors)
Router.patch("/patient/:id",verifyToken,changePassword)


module.exports = Router;