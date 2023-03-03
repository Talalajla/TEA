import React, { useEffect, useState } from "react";
import { DayItem, DaysContainer } from "../../../styles/weather/days";

const findMostFrequestItem = (arr) => {
    return arr.sort((a, b) => 
        arr.filter(v => v===a).length
        - arr.filter(v => v===b).length).pop();
}



const Day = ({day, dayInfo, index}) => {
    const [avgTemp, setAvgTemp] = useState('');
    const [dayDesc, setDayDesc] = useState('');
    const [dayIcon, setDayIcon] = useState('');

    useEffect(() => {
        const getAvgStats = () => {
            const temps = day.map((dayobj) => dayobj.main.temp);
            const sumTemps = Math.round(temps.reduce((a, b) => a+b, 0) / temps.length * 100) / 100;
            const descriptions = day.map((dayobj) => dayobj.weather[0].description);
            const mostFreqDesc = findMostFrequestItem(descriptions);
            let icon;
            day.forEach(hourInterval => {
                if (hourInterval.weather[0].description === mostFreqDesc)
                    icon = hourInterval.weather[0].icon;
            });

            setAvgTemp(sumTemps);
            setDayDesc(mostFreqDesc);
            setDayIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`);
        }
        getAvgStats();
    }, [day])
    

    return (
        <DayItem>
            <div>
                {dayInfo.dayNumber[index]} {dayInfo.dayName[index]}
            </div>
            <div>
                {avgTemp} st C
            </div>
            <img src={dayIcon} alt={dayDesc} />
            <div>
                {dayDesc}
            </div>
        </DayItem>
    );
}

const Days = ({days, daysInfo}) => {
    if (!days || !daysInfo) return;

    return(
        <DaysContainer>
            {days.map((day, index) => <Day day={day} dayInfo={daysInfo} index={index} key={index} /> )}
        </DaysContainer>
    );
}

export default Days;