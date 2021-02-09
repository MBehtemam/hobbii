const getHumanTimes = (times) => {
    return times.reduce((prev,current)=>{
        const diffTime = parseInt(current.end,10) - parseInt(current.start,10);
        var minutesDifference = Math.floor(diffTime/1000/60);
        return prev + minutesDifference
    },0)
 }

 module.exports = {
     getHumanTimes
 }