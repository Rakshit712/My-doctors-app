const isStrongPassword = (password) => {
    const isLongEnough = password.length >= 7;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    const hasSpecialCharacters = /[\!\@\#\$\%\^\&\*\(\)_\+\-\=\{\}\[\]:;"'\<\>\?\/\|,]/g.test(password);
    return isLongEnough && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters;
};

const isValidMobileNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValiduserData = (userData)=>{
    if(!isStrongPassword(userData.password))return [false, 'Password should be at least  8 characters long and contain a mix of uppercase, lowercase and special characters  '];
    if(!isValidMobileNumber(userData.contactNo)) return[false,'mobile number should be of 10 digits'];
    if(!isValidEmail(userData.email)) return [false,'email is not valid '];

    return [true, "valid data"];

}

module.exports = isValiduserData;

