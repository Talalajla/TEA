import React, { useEffect, useState } from "react";
import { DayItem, DayRadio, DaysContainer, DaysIntervalCard, DaysIntervalContainer, DaysIntervalInner } from "../../../styles/weather/days";
import { UnitFromText } from "../../shared/helper/unit";
import { BiMoveHorizontal } from "react-icons/bi";

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
    else if (id === 800) return "01d"
    else if (id === 801) return "02d"
    else if (id === 802) return "03d"
    else if (id > 802) return "04d"
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

const Day = (props) => {
    const [avgTemp, setAvgTemp] = useState('');
    const [dayDesc, setDayDesc] = useState('');
    const [dayIcon, setDayIcon] = useState('');

    const {day, dayInfo, index} = props;

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
            setDayIcon(`https://openweathermap.org/img/wn/${icon}@2x.png`);
        }
        getAvgStats();
    }, [day]);
    let unitText;
    if (props.unit !== '')
        unitText = UnitFromText(props.unit);
    
    const createID = `day${index}`;
    return (
        <label htmlFor={createID}>
            <DayRadio defaultChecked={index===0?true:false} name="day" id={createID} value={index} onInput={props.changeDay} />
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
        </label>
    );
}

const Days = ({days, daysInfo, changeDay, weatherData, currentDay}) => {
    const [unit, setUnit] = useState('');
    
    useEffect(() => {
        setUnit(localStorage.getItem('tempunit'));
    }, [days]);

    if (!days || !daysInfo) return;

    const currentDayData = [
        weatherData.days[currentDay],
        weatherData.hours[currentDay],
        weatherData.icons[currentDay],
    ]

    return(
        <>
        <DaysContainer>
            {days.map((day, index) => <Day changeDay={changeDay} unit={unit} day={day} dayInfo={daysInfo} index={index} key={index} /> )}
        </DaysContainer>
        <DaysIntervalContainer>
            <h4>Hourly schedule</h4>
            <DaysIntervalInner>
            {   currentDayData[1][0] !== '00:00' &&
                <DaysIntervalCard style={{minWidth: '0', position: 'relative', marginLeft: `${Math.floor((+currentDayData[1][0].slice(0, 2))/3*87.7)}px`}}>
                    <BiMoveHorizontal style={{left: `-${(+currentDayData[1][0].slice(0, 2))/3*50}px`}} />
                </DaysIntervalCard>
            }
            {
                currentDayData[0].map((temperature, index) => (
                    <DaysIntervalCard key={index}>
                        <img src={`https://openweathermap.org/img/wn/${currentDayData[2][index]}.png`} alt='weather icon' />
                        <div style={{padding: '2.5px 0 5px'}}>{temperature}{UnitFromText(unit)}</div>
                        <div>{currentDayData[1][index]}</div>
                    </DaysIntervalCard>
                ))
            }
            </DaysIntervalInner>
        </DaysIntervalContainer>
        </>
    );
}

export default Days;