const isValidstartTime = (startTime) => {
    return startTime instanceof Date && startTime > new Date();
};

const isValidendTime = (endTime) => {
    return endTime instanceof Date && endTime > new Date();
};


const isValidSlotDetails = (slotData)=>{

    const startTime = new Date(slotData.startTime);
    const endTime = new Date(slotData.endTime);
    
    if(!isValidstartTime(startTime))return[false,'startTime is not valid '];
    if(!isValidendTime(endTime))return[false,'endTime is not valid']
    return [true, "valid data"];

}

module.exports = isValidSlotDetails;

