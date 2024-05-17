const express = require("express");
const { signUp, logIn,changePassword } = require("../controller/userController");
const { verifyToken } = require("../util/userAuthentication");

const Router = express.Router();

Router.post("/register",signUp)
Router.post("/login", logIn)


Router.patch("/patient/:id",verifyToken,changePassword)


module.exports = Router;