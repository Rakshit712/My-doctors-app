const mongoose  = require("mongoose");

const specialitySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please provide the speciality" ]
        },
        imageUrl:{
            type:String
        },

    }
)

const Speciality = mongoose.model("Speciality",specialitySchema);

module.exports = Speciality;