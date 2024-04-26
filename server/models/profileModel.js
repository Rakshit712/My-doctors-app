const mongoose = require("mongoose");
const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }

})

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;