const mongoose = require("mongoose");
const User = require("./userModel");

const profileSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: User,
            required: true,
            unique:true
        },
        bloodGroup:{
            type: String,
            required: true,
            enum:["A+","A-","B+", "AB+", "AB-","O+","O-"]
        },
        address:
            {
            houseNo:{
                type:String,
            },
            street: {
                type:String,
            },
            city:{
                type:String,
            },
            state:{
                type:String,
            },
            pincode:{
                type:Number,
            },
            country:{
                type:String,

            }
        },
        languages:{
            type:Array
        },
        bio:{
            type:String
        },
        qualification:[
            {
            certification:{
                type:String
            },
            institutionName: {
                type:String
            },
            yearOfCompletion:{
                type:String
            },
        }],
        specialities : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Speciality"
            }
          

        ],
        experience:[
            {
                position:{
                    type:String
                },
                place:{
                    type:String
                },
                fromYear:{
                    type:String
                },
                fromMonth:{
                    type:String
                },
                toYear:{
                    type:String
                },
                toMonth:{
                    type:String
                }

            }
        ],
        consultationFee:{
            type:String
        },
        licenceNumber:{
            type:String,
        },
        experienceMonths:{
            type:String,
        }
        
        
        
    }
)

const Profile = mongoose.model("profile",profileSchema);
module.exports = Profile;
