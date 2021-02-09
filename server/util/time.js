const getHumanTimes = (times) => {
    return times.reduce((prev,current)=>{
        const diffTime = current.end - current.start;
        var minutesDifference = Math.floor(diffTime/1000/60);
        return prev + minutesDifference
    },0)
 }

 module.exports = {
     getHumanTimes
 }