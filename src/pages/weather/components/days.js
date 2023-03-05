import React, { useEffect, useState } from "react";
import { DayItem, DaysContainer } from "../../../styles/weather/days";
import { UnitFromText } from "../../shared/helper/unit";

const findMostFrequentItem = (arr) => {
    return arr.sort((a, b) => 
        arr.filter(v => v===a).length
        - arr.filter(v => v===b).length).pop();
}

const findIcon = (id) => {
    if (id >= 200 && id < 300) return "11d"
    else if (id >= 300 && id < 500) return "09d"
    else if (id >= 500 && id <= 504) return "10d"
    else if (id >= 511 && id < 600) return "09d"
    else if (id >= 600 && id < 700) return "13d"
    else if (id >= 700 && id < 800) return "50d"
    else if (id === 800) 
        return new Date().getHours() >= 20 && new Date().getHours() < 6 
        ?  "01d"
        :  "01n"
    else if (id === 801)
        return new Date().getHours() >= 20 && new Date().getHours() < 6 
        ?  "02d"
        :  "02n"
    else if (id === 802)
        return new Date().getHours() >= 20 && new Date().getHours() < 6 
        ?  "03d"
        :  "03n"
    else if (id > 802)
        return new Date().getHours() >= 20 && new Date().getHours() < 6 
        ?  "04d"
        :  "04n"
    else return "Error";
} 

const findDayName = (id) => {
    if (id >= 200 && id < 300) return "Thunderstorm"
    else if (id >= 300 && id < 500) return "Drizzle"
    else if (id >= 500 && id < 600) return "Rain"
    else if (id >= 600 && id < 700) return "Snow"
    else if (id === 701) return "Mist"
    else if (id === 711) return "Smoke"
    else if (id === 721) return "Haze"
    else if (id === 731 || id === 761) return "Dust"
    else if (id === 741) return "Fog"
    else if (id === 751) return "Sand"
    else if (id === 762) return "Ash"
    else if (id === 771) return "Squall"
    else if (id === 781) return "Tornado"
    else if (id === 800) return "Clear"
    else if (id > 800 && id < 900) return "Clouds"
    else return "Error";
} 

const Day = ({day, dayInfo, index}) => {
    const [avgTemp, setAvgTemp] = useState('');
    const [dayDesc, setDayDesc] = useState('');
    const [dayIcon, setDayIcon] = useState('');
    const [unit, setUnit] = useState('');

    useEffect(() => {
        const getAvgStats = () => {
            const temps = day.map((dayobj) => dayobj.main.temp);
            const sumTemps = Math.round(temps.reduce((a, b) => a+b, 0) / temps.length * 100) / 100;
            const weatherIDs = day.map((dayobj) => dayobj.weather[0].id);
            const mostFreqID = findMostFrequentItem(weatherIDs);
            const dayName = findDayName(mostFreqID);
            const icon = findIcon(mostFreqID);

            setAvgTemp(sumTemps);
            setDayDesc(dayName);
            setDayIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`);
        }
        getAvgStats();
        setUnit(localStorage.getItem('tempunit'));
    }, [day]);
    let unitText;
    if (unit !== '')
        unitText = UnitFromText(unit);
    

    return (
        <DayItem>
            <div>
                {dayInfo.dayNumber[index]} {dayInfo.dayName[index]}
            </div>
            <div>
                {avgTemp}<sup>{unitText}</sup>
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