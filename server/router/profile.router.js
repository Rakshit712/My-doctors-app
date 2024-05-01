const express = require("express");
const { addProfile, updateProfile, getProfile } = require("../controller/profileController");
const { verifyToken } = require("../util/userAuthentication");

const Router = express.Router();

Router.post("/",verifyToken,addProfile);
Router.put("/:id",verifyToken,updateProfile);
Router.get("/:id", verifyToken,getProfile)

module.exports = Router;