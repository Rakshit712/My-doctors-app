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

    if(!/^\d{4}$/.test(yearOfCompletion)) return false;

    return yearOfCompletion <= currentYear;

};
const isValidFromMonth = (fromMonth) => {
    return /^(0[1-9]|1[0-2])$/.test(fromMonth);
}
const isValidToMonth = (toMonth) => {
    return /^(0[1-9]|1[0-2])$/.test(toMonth);
}


const isValidProfileData = (profileData)=>{

    const { experience, qualification } = profileData;

    if (experience) {
        for (const exp of experience) {
            if (!isValidfromYear(exp.fromYear)) return [false, 'fromYear is not valid'];
            if (!isValidToYear(exp.toYear, exp.fromYear)) return [false, 'toYear is not valid'];
            if (!isValidFromMonth(exp.fromMonth)) return [false,'from month is not valid']
            if (!isValidToMonth(exp.toMonth)) return [false,'to month is not valid']
        }
    }

    // Check qualification if it exists
    if (qualification) {
        for (const qual of qualification) {
            if (!isValidYearOfCompletion(qual.yearOfCompletion)) return [false, 'yearOfCompletion is not valid'];
        }
    }

    return [true, "valid data"];
}

module.exports = isValidProfileData;

