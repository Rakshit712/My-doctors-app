const express = require("express");
const { getProfile, updateProfile } = require("../controller/profileController");
const { verifyToken } = require("../util/userAuthentication");

const Router = express.Router();

Router.get("/",verifyToken,getProfile)
Router.patch("/:id",verifyToken,updateProfile)

module.exports = Router;