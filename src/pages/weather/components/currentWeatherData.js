import React, { useState } from 'react';
import { WeatherBox, WeatherCurrentDescription, WeatherCurrentTemp, WeatherCurrentTempVal, WeatherRow, WeatherRowOthers } from '../../../styles/weather/days';
import { UnitFromText } from '../../shared/helper/unit';

const CurrentWeatherData = ({dayData, unit, changeUnit, cityData}) => {
    if (!dayData.current) return;

    const now = dayData.current;
    const details = now.weather[0];

    let overrideIcon;
    const timeNow = new Date().getHours();
    
    if ((timeNow > 22) || (timeNow >= 0 && timeNow < 6)) {
        overrideIcon = details.icon;
    } else {
        overrideIcon = details.icon.replace('n', 'd');
    }

    return (
        <>
        {
            cityData &&
            <WeatherBox>
                <WeatherRow>{`${cityData.city}, ${cityData.country}`}</WeatherRow>
                <WeatherRow>
                    <span>
                        <img width='100' src={`https://openweathermap.org/img/wn/${overrideIcon}@2x.png`} alt="Weather icon" />
                    </span>
                    <WeatherCurrentTemp>
                        {now.temp} 
                        <span>°</span>
                        {/* {UnitFromText(unit)} */}
                        <div>
                            <WeatherCurrentTempVal active={unit === 'metric'} onClick={() => changeUnit('metric')}>C</WeatherCurrentTempVal>
                            <WeatherCurrentTempVal active={unit === 'imperial'} onClick={() => changeUnit('imperial')}>F</WeatherCurrentTempVal>
                            <WeatherCurrentTempVal active={unit === 'default'} onClick={() => changeUnit('default')}>K</WeatherCurrentTempVal>
                        </div>
                    </WeatherCurrentTemp>
                </WeatherRow>
                <WeatherCurrentDescription>{details.description}</WeatherCurrentDescription>
                <WeatherRowOthers>
                    <div>Feels like: {now.feels_like} {UnitFromText(unit)}</div>
                    <div>Wind: {now.wind_speed}m/s</div>
                    <div>Visibility: {now.visibility/1000}km</div>
                </WeatherRowOthers>
                <WeatherRowOthers>
                    <div>Humidity: {now.humidity}%</div>
                    <div>Pressure: {now.pressure} hPa</div>
                </WeatherRowOthers>
            </WeatherBox>
        }
        </>
    );
}

export default CurrentWeatherData;