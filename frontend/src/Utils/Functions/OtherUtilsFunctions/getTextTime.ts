import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

interface getTextTimeProps {
    time: number[];
}
export default function getTextTime({time}:getTextTimeProps){
    const Year = time[0];
    const Month = time[1];
    const Day = time[2];
    const Hour = time[3];
    const Minute = time[4];

    const d = new Date();

    const CurrentYear = d.getFullYear();
    const CurrentMonth = d.getMonth() + 1;
    const CurrentDay = d.getDate();
    const CurrentHour = d.getHours();
    const CurrentMinute = d.getMinutes();

    if(CurrentYear - Year > 0){
        if(CurrentYear - Year > 1){
            const date = CurrentYear - Year;
            return date + " " + getLanguage("timer.yearsAgo");
        }

        return CurrentYear - Year + " " + getLanguage("timer.yearAgo");
    }

    if(CurrentMonth - Month > 0){
        if(CurrentMonth - Month > 1){
            const date = CurrentMonth - Month;
            return date + " " + getLanguage("timer.monthsAgo");
        }
        return CurrentMonth - Month + " " + getLanguage("timer.monthAgo");
    }

    if(CurrentDay - Day > 0){
        if(CurrentDay - Day > 1){
            const date = CurrentDay - Day;
            return date + " " + getLanguage("timer.daysAgo");
        }
        return CurrentDay - Day + " " + getLanguage("timer.dayAgo");
    }

    if(CurrentHour - Hour > 0){
        if(CurrentHour - Hour > 1){
            const date = CurrentHour - Hour;
            return date + " " + getLanguage("timer.hoursAgo");
        }
        return CurrentHour - Hour + " " + getLanguage("timer.hourAgo");
    }

    if(CurrentMinute - Minute > 0){
        if(CurrentMinute - Minute > 1){
            const date = CurrentMinute - Minute;
            return date + " " + getLanguage("timer.minutesAgo");
        }
        return CurrentMinute - Minute + " " + getLanguage("timer.minuteAgo");
    }

    return getLanguage("timer.justNow");
}