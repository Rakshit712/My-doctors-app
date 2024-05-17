const express = require("express");
const server = express();
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();

server.use(express.json());
server.use(cors());

const Router = require("./router")


server.use("/api/auth",Router.userRouter);
server.use("/api/profile",Router.profileRouter);
server.use("/api/slot",Router.slotRouter);
server.use("/api/specialities",Router.SpecialityRouter);
server.use("/api/appointment",Router.appointmentRouter);
server.use("/api/doctors",Router.doctorRouter);

const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database")
}).catch((err) => {
    console.log("error connecting to Database", err);
})

const port = process.env.PORT
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});