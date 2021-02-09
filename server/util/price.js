const calculatePrice = (totalMinutes, basePricePerHour) => {
    const hours = totalMinutes / 60;
    const minutes = hours % 60;
    const minutesPrice = basePricePerHour / 60;
    return ((hours * basePricePerHour) + (minutes * minutesPrice)).toFixed(2)
}


module.exports = {
    calculatePrice
}