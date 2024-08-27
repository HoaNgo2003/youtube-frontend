export const fomatTime = (time)=>{
    let hour = 0, minute = 0, second = 0;
    hour = Math.floor(time / 3600);
    time = time % 3600;
    minute = Math.floor(time / 60);
    second =  Math.floor(time % 60).toFixed(0)
    if(hour < 10) hour = "0" + hour
    if(minute < 10 ) minute ="0" +minute
    if(second < 10) second = "0" +second
    return `${hour}:${minute}:${second}`
}