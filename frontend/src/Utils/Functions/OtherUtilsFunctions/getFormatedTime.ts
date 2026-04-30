interface getFormatedTimeResponse {
    time: number[];
}

export default function getFormatedTime({time}: getFormatedTimeResponse) {
    const currentTime = new Date();

    if (!time || time.length < 6) return "";
    const [year, month, day, hour, minute, second = 0, nano = 0] = time;

    const date = new Date(Date.UTC(
        year,
        month - 1,
        day,
        hour,
        minute,
        second,
        Math.floor(nano / 1_000_000)
    ));

    if(isNaN(date.getTime())) return "";

   if(currentTime.getFullYear() === date.getFullYear()){
       if (currentTime.getMonth() === date.getMonth()){
           if(currentTime.getDate() === date.getDate()){
               return date.toLocaleString("uk-UA", {
                   hour: "2-digit",
                   minute: "2-digit",
               });
           }else{
               return date.toLocaleString("uk-UA", {
                   day: "2-digit",
                   month: "2-digit",
                   hour: "2-digit",
                   minute: "2-digit",
               });
           }
       }else{
           return date.toLocaleString("uk-UA", {
               day: "2-digit",
               month: "2-digit",
               hour: "2-digit",
               minute: "2-digit",
           });
       }
   }else {
       return date.toLocaleString("uk-UA", {
           day: "2-digit",
           month: "2-digit",
           year: "numeric",
           hour: "2-digit",
           minute: "2-digit",
       });
   }
}