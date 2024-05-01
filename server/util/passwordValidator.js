

const isValiduserPassword = (newPassword)=>{
    console.log(newPassword)
    const isLongEnough = newPassword.length >= 7;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialCharacters = /[\!\@\#\$\%\^\&\*\(\)_\+\-\=\{\}\[\]:;"'\<\>\?\/\|,]/g.test(newPassword);

    if(isLongEnough && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters){
        return [true,'password is valid'];
    }
    else{
        return [false, 'Password should be at least  8 characters long and contain a mix of uppercase, lowercase and special characters  ']
    }
    

}
module.exports = isValiduserPassword;