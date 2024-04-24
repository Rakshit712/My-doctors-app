const isValidstartTime = (startTime) => {
    return startTime instanceof Date && startTime > new Date();
};

const isValidendTime = (endTime) => {
    return endTime instanceof Date && endTime > new Date();
};


const isValidSlotDetails = (slotData)=>{
    if(!isValidstartTime(slotData.startTime))return[false,'startTime is not valid '];
    if(!isValidendTime(slotData.endTime))return[false,'endTime is not valid']
    return [true, "valid data"];

}

module.exports = isValidSlotDetails;

