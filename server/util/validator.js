const isValidName = (name) => {
    return /\S/.test(name);
};

const isValidGender = (gender) => {
    return /\S/.test(gender);
};
const isStrongPassword = (password) => {
    console.log("hellooo")
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

const isValiduserData = (userData) => {
    
    if (userData.profile) {
        const { experience, qualification } = userData.profile;

        if (experience) {
            for (const exp of experience) {
                if (!isValidfromYear(exp.fromYear)) return [false, 'From year is not valid.'];
                if (!isValidToYear(exp.toYear, exp.fromYear)) return [false, 'To year is not valid.'];
                if (!isValidFromMonth(exp.fromMonth)) return [false, 'From month is not valid.'];
                if (!isValidToMonth(exp.toMonth)) return [false, 'To month is not valid.'];
            }
        }

        if (qualification) {
            for (const qual of qualification) {
                if (!isValidYearOfCompletion(qual.yearOfCompletion)) return [false, 'Year of completion is not valid.'];
            }
        }

        // If profile data exists and it's valid, return valid
        return [true, 'Valid data.'];
    }

    // If profile data doesn't exist, then validate required fields
    if (!userData.password || !userData.contactNo || !userData.email || !userData.gender || !userData.name) {
        return [false, 'Please provide all required fields.'];
    }

    if (!isStrongPassword(userData.password)) {
        return [false, 'Password should be at least 8 characters long and contain a mix of uppercase, lowercase, and special characters.'];
    }

    if (!isValidMobileNumber(userData.contactNo)) {
        return [false, 'Mobile number should be a 10-digit number.'];
    }

    if (!isValidEmail(userData.email)) {
        return [false, 'Email is not valid.'];
    }

    if (!isValidGender(userData.gender)) {
        return [false, 'Gender is not valid.'];
    }

    if (!isValidName(userData.name)) {
        return [false, 'Name is not valid.'];
    }

    return [true, 'Valid data.'];
};


module.exports = isValiduserData;

