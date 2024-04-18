const express = require("express");
const { signUp, logIn } = require("../controller/userController");

const Router = express.Router();

Router.post("/register",signUp)
Router.post("/login", logIn)


module.exports = Router;