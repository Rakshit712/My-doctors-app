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
        enabled:{
            type:Boolean,
            default:true
        },
        reviewed:{
            type:Boolean,
            default:true
        },
        deleted:{
            type:Boolean,
            default:false
        }

    }
)

const Speciality = mongoose.model("Speciality",specialitySchema);

module.exports = Speciality;