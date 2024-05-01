const isValidName = (name) => {
    return /\S/.test(name);
};

const isValidGender = (gender) => {
    return /\S/.test(gender);
};
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

const isValidfromYear = (fromYear) => {
  
    if (!/^\d{4}$/.test(fromYear)) return false;
   
    return parseInt(fromYear) <= new Date().getFullYear();
};

const isValidToYear = (toYear, fromYear) => {
    
    const currentYear = new Date().getFullYear();
    
    if (!/^\d{4}$/.test(toYear)) return false;
    
    const numericToYear = parseInt(toYear);
    const numericFromYear = parseInt(fromYear);

    return numericToYear >= numericFromYear && numericToYear <= currentYear;
};

const isValidYearOfCompletion = (yearOfCompletion) => {
   
    const currentYear = new Date().getFullYear().toString();

    if(!/^\d{4}$/.test(yearOfCompletion)) return false;3

    return yearOfCompletion <= currentYear;

};
const isValidFromMonth = (fromMonth) => {
    return /^(0[1-9]|1[0-2])$/.test(fromMonth);
}
const isValidToMonth = (toMonth) => {
    return /^(0[1-9]|1[0-2])$/.test(toMonth);
}

const isValiduserData = (userData)=>{

    if(userData.password && userData.contactNo && userData.email &&userData.email && userData.gender && userData.name){
        if(!isStrongPassword(userData.password))return [false, 'Password should be at least  8 characters long and contain a mix of uppercase, lowercase and special characters  '];
        if(!isValidMobileNumber(userData.contactNo)) return[false,'mobile number should be of 10 digits'];
        if(!isValidEmail(userData.email)) return [false,'email is not valid '];
        if(!isValidGender(userData.gender))return[false,'gender is not valid '];
        if(!isValidName(userData.name))return[false,'name is not valid'];
        }
    if(userData.profile){

    const { experience, qualification } = userData.profile;

        if (experience) {
            for (const exp of experience) {
                if (!isValidfromYear(exp.fromYear)) return [false, 'fromYear is not valid'];
                if (!isValidToYear(exp.toYear, exp.fromYear)) return [false, 'toYear is not valid'];
                if (!isValidFromMonth(exp.fromMonth)) return [false,'from month is not valid']
                if (!isValidToMonth(exp.toMonth)) return [false,'to month is not valid']
            }
        }

        if (qualification) {
            for (const qual of qualification) {
                if (!isValidYearOfCompletion(qual.yearOfCompletion)) return [false, 'yearOfCompletion is not valid'];
            }
        }
    }

    return [true, "valid data"];

}

module.exports = isValiduserData;

