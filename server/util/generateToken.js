const jwt  = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(payload){
    return jwt.sign({payload},process.env.SECRET_KEY, {expiresIn: '1d'})
}

module.exports = generateToken