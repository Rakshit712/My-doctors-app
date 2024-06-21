const moment  = require("moment")

const getExpiry = (date) => {
    date= moment("01-2024","MM-YYYY").toDate();
    return {
        month:moment(date).format("M"),
        year:moment(date).format("YYYY")
    }

}
module.exports = getExpiry;