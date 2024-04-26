const mongoose = require("mongoose");
const Speciality = require("./specialityModel")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your full name"]
    },
    gender: {
        type: String,
        required: [true, "Please provide your gender"]
    },
    dateOfBirth: {
        type: Date,
    },
    contactNo: {
        type: String,
        required: [true, "Please provide your mobile number"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true
    },
    password: {
        type: String,
        reuired: true
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,

    },
    profile:
        {
            bloodGroup: {
                type: String,
                
                enum: ["A+", "A-", "B+", "AB+", "AB-", "O+", "O-"]
            },
            address:
            {
                houseNo: {
                    type: String,
                },
                street: {
                    type: String,
                },
                city: {
                    type: String,
                },
                state: {
                    type: String,
                },
                pincode: {
                    type: Number,
                    validate: {
                        validator: function (value) {
                            return /^[1-9][0-9]{5}$/.test(value);
                        },
                        message: props => `${props.value} is not a valid pincode. Pincode should be a 6-digit number and should not start with zero.`
                    }
                },
                country: {
                    type: String,

                }
            },
            languages: {
                type: Array
            },
            bio: {
                type: String
            },
            qualification: [
                {
                    certification: {
                        type: String
                    },
                    institutionName: {
                        type: String
                    },
                    yearOfCompletion: {
                        type: String
                    },
                }],
            specialities: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: Speciality
                }


            ],
            experience: [
                {
                    position: {
                        type: String
                    },
                    place: {
                        type: String
                    },
                    fromYear: {
                        type: String
                    },
                    fromMonth: {
                        type: String
                    },
                    toYear: {
                        type: String
                    },
                    toMonth: {
                        type: String
                    }

                }
            ],
            consultationFee: {
                type: Number
            },
            licenceNumber: {
                type: String,
            },
            experienceMonths: {
                type: String,
            }



        }

})

const User = mongoose.model("user", userSchema);
module.exports = User;