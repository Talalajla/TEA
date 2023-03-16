import React, { useEffect, useState } from 'react';
import { WeatherBox, WeatherCurrentDescription, WeatherCurrentTemp, WeatherRow, WeatherRowOthers } from '../../../styles/weather/days';
import { UnitFromText } from '../../shared/helper/unit';

const CurrentWeatherData = ({dayData, unit}) => {
    const [cityData, setCityData] = useState(null);
    useEffect(() => {
		if (!cityData && localStorage.getItem('TED_cityData')) setCityData(JSON.parse(localStorage.getItem('TED_cityData')));
    }, []);

    if (!dayData.current) return;
    console.log(dayData, cityData);
    const now = dayData.current;
    const details = now.weather[0];

    return (
        <>
        {
            cityData &&
            <WeatherBox>
                <WeatherRow>{`${cityData.city}, ${cityData.country}`}</WeatherRow>
                <WeatherRow>
                    <span>
                        <img width='100' src={`https://openweathermap.org/img/wn/${details.icon}@2x.png`} />
                    </span>
                    <WeatherCurrentTemp>
                        {now.temp} {UnitFromText(unit)}
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
                    <div>Pressure: {now.pressure}hPa</div>
                </WeatherRowOthers>
            </WeatherBox>
        }
        </>
    );
}

export default CurrentWeatherData;