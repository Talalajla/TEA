import React, { useEffect, useRef, useState } from "react";
import ModalRoot from "../../components/modal/modalRoot";
import Background from "../../layout/background";
import { MenuContainer } from "../../styles/home/main";
import Days from "./components/days";
import MenuBar from "../shared/menubar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/linechart";
import zoomPlugin from "chartjs-plugin-zoom";
import { ChartContainer } from "../../styles/weather/chart";
import CurrentWeatherData from "./components/currentWeatherData";
import { WeatherContent } from "../../styles/weather/main";
import { WeatherCitiesItem, WeatherCitiesItemData, WeatherCitiesList, WeatherSearch, WeatherSearchBox, WeatherSearchBtn, WeatherSearchLabel } from "./components/search";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useClickAway } from "react-use";
import { WeatherRecentDay, WeatherRecentDays } from "../../styles/weather/days";
import { figureRecentCitiesArray } from "../shared/helper/recentCities";
import ModalService from "../../components/modal/services/modalService";
import BackgroundModal from "../home/changeBackgroundModal";
import Shortcuts from "../shared/shortcutsModal";

Chart.register({CategoryScale, zoomPlugin});

const groupData = (weatherArr) => {
	if (weatherArr.length === 0) return;
	const newArr = [];
	const firstIntervalHour = +weatherArr[0].dt_txt.slice(-8).slice(0, 2);
	const indexFixer = firstIntervalHour/3;
	if (firstIntervalHour !== 0)
		newArr.push(weatherArr.splice(0, 8 - indexFixer));
	while (weatherArr.length) {
		const day = weatherArr.splice(0, 8);
		if (newArr.length < 5)
			newArr.push(day);
	}
	for(var i=0; i<newArr.length; i++) {
		let dataToClone;
		if (i < newArr.length - 1)
			dataToClone = newArr[i+1][0];
		if (dataToClone)
			newArr[i].push(dataToClone);
	}
	return newArr;
}

const extractDaysData = weatherArr => {
	const tempArray = [];
	for (var i=0; i<5;i++) {
		const newArrayLine = weatherArr[i].map((interval) => interval.main.temp);
		tempArray.push(newArrayLine);
	}
	return tempArray;
}
const extractHoursData = weatherArr => {
	const hrsArray = [];
	for(var i=0;i<5;i++) {
		const newArrayLine = weatherArr[i].map((interval) => interval.dt_txt.slice(-8).slice(0, 5));
		hrsArray.push(newArrayLine)
	}
	weatherArr.map(interval => interval.dt_txt)
	return hrsArray;
};
const extractIconsData = weatherArr => {
	const iconsArray = [];
	for(var i=0;i<5;i++) {
		const newArrayLine = weatherArr[i].map((interval) => {
			const ico = interval.weather[0].icon.replace('n', 'd');
			return ico;
		});
		iconsArray.push(newArrayLine)
	}
	return iconsArray;
}

const fillChartWithData = (days, hours, icons) => {
	const chartDataObject = { days, hours, icons }
	return chartDataObject;
}

const generateNextDays = (days) => {
	const dayNamesList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const dayInfo = {
		dayNumber: [],
		dayName: []
	}
	const today = new Date();
	const firstIntervalHour = +days[0][0].dt_txt.slice(-8).slice(0, 2);
	var moveDays1step=0;
	// Fix day if data are being fetched after 0:00 AM and first interval hour is still for 0:00 AM 
	if (firstIntervalHour === 0) {
		const today = new Date();
		const dateTemplate = `${today.getFullYear()}-${today.getMonth()+1 < 10 ? '0' + (today.getMonth()+1) : today.getMonth()+1}-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
		if (!+days[0][0].dt_txt.includes(dateTemplate))
			moveDays1step=1; 
	}
	var i = 0;
	while (i < 5 + moveDays1step) {
		const localDate = new Date().setDate(today.getDate() + i);
		const dayNameIndex = new Date(localDate).getDay();
		const dayNumber = new Date(localDate).getDate();
		dayInfo.dayName.push(dayNamesList[dayNameIndex])
		dayInfo.dayNumber.push(dayNumber);
		i++;
	}
	if (moveDays1step === 1) {
		dayInfo.dayName.shift();
		dayInfo.dayNumber.shift();
	}
		
	return dayInfo;
}

export default function Weather(props) {
	const apikey = "0849360447e69eda07189e0b383ff858";
	const [days, setDays] = useState(null);
	const [daysInfo, setDaysInfo] = useState(null);
	const [chartDays, setChartDays] = useState(null);
	const [chartIcons, setChartIcons] = useState(null);
	const [chartHours, setChartHours] = useState(null);
	const [chartData, setChartData] = useState(null);
	const [activeChart, setActiveChart] = useState("0"); //today
	const [unit, setUnit] = useState(null);
	const [cityData, setCityData] = useState(null);
	const [currentData, setCurrentData] = useState([]);
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState(null);
	const [searchedCities, setSearchedCities] = useState([]);
	const [recentCities, setRecentCities] = useState(null);
	const SearchRef = useRef('');

	const [backgroundType, setBackgroundType] = useState(null);
	const [backgroundNumber, setBackgroundNumber] = useState(null);
	const [hexColor, setHexColor] = useState('');
	const [shadow, setShadow] = useState('');

	useClickAway(SearchRef, () => setSearchedCities([]), ["mousedown"]);

    useEffect(() => {
		if (!recentCities && localStorage.getItem('TEA_recentCities')) 
			setRecentCities(JSON.parse(localStorage.getItem('TEA_recentCities')));
			
		if(!cityData)
			if (localStorage.getItem("TEA_cityData")) 
				setCityData(JSON.parse(localStorage.getItem("TEA_cityData")));
			else {
				const baseCityData = {"city":"Warsaw","country":"PL","state":"Masovian Voivodeship","lat":52.2319581,"lon":21.0067249};
				localStorage.setItem("TEA_cityData", JSON.stringify(baseCityData));
				setCityData(baseCityData);
			}
		if (!unit)
			if (localStorage.getItem("tempunit")) 
				setUnit(localStorage.getItem("tempunit"));
			else {
				const baseUnit = 'metric';
				localStorage.setItem('tempunit', baseUnit);
				setUnit(baseUnit);
			}
		if (!backgroundType) 
			if(localStorage.getItem("TEA_backgroundType")) 
				setBackgroundType(localStorage.getItem("TEA_backgroundType"));
			else {
				const baseBgType = 'photo';
				localStorage.setItem('TEA_backgroundType', baseBgType);
				setBackgroundType(baseBgType);
			}
		if (backgroundType === "photo")
			if (localStorage.getItem("TEA_backgroundNumber"))
				setBackgroundNumber(localStorage.getItem("TEA_backgroundNumber"));
			else {
				const baseBgNum = 8;
				localStorage.setItem('TEA_backgroundNumber', baseBgNum);
				setBackgroundNumber(baseBgNum);
			}
		if (!hexColor)
			if (localStorage.getItem('TEA_backgroundColor'))
				setHexColor(localStorage.getItem('TEA_backgroundColor'));
			else
				localStorage.setItem('TEA_backgroundColor', '');
		if (!shadow)
			if (localStorage.getItem('TEA_backgroundShadow'))
				setShadow(localStorage.getItem('TEA_backgroundShadow'));
			else
				localStorage.setItem('TEA_backgroundShadow', '50');


		if (!cityData || !unit) return;

		const fetchData = async () => {
			setStatus("Fetching");

			const apiRequestDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`;
			const apiRequestCurrent = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`;

			const responseCurrent = await fetch(apiRequestCurrent);
			const dataCurrent = await responseCurrent.json();

			setCurrentData(dataCurrent);

			const responseDays = await fetch(apiRequestDays);
			const dataDays = await responseDays.json();
			setData(dataDays);

			setStatus("Done");
		};
		if (status === "idle") fetchData();
    }, [cityData, recentCities, status, unit, backgroundType]);

	const changeUnit = (newUnit) => {
		if (newUnit !== unit) {
			localStorage.setItem('tempunit', newUnit);
			setUnit(newUnit);
			setStatus('idle');
		}
	}

	useEffect(() => {
		if (data && data.message === 0) setDays(groupData(data.list));
	}, [data]);

	useEffect(() => {
		if (days && data.message === 0) setChartDays(extractDaysData(days));
	}, [days]);
	useEffect(() => {
		if (days && data.message === 0) setChartHours(extractHoursData(days));
	}, [days]);
	useEffect(() => {
		if (days && data.message === 0) setChartIcons(extractIconsData(days));
	}, [days]);

	useEffect(() => {
		if (chartDays && chartHours)
			setChartData(fillChartWithData(chartDays, chartHours, chartIcons));
	}, [chartDays, chartHours, chartIcons, data])

	useEffect(() => {
		if (days && data.message === 0) {
			setDaysInfo(generateNextDays(days));
		}
	}, [days]);

	const changeDay = (e) => setActiveChart(e.currentTarget.value);

	const searchForCities = (e) => {
		e.preventDefault();
		const city = e.target.nextElementSibling.value;
		if (city === "" || !city) return;

		fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`)
			.then(res => res.json())
			.then(data => setSearchedCities(data));
	}

	const changeCity = (e) => {
		const index = e.currentTarget.dataset.val;
		const newcity = searchedCities[index];
		const cityObj = {
			city: newcity.name,
			country: newcity.country,
			state: newcity.state,
			lat: newcity.lat,
			lon: newcity.lon
		}

		const recentCitiesArray = figureRecentCitiesArray(cityObj);

		localStorage.setItem('TEA_recentCities', JSON.stringify(recentCitiesArray));
		setRecentCities(recentCitiesArray);
		localStorage.setItem('TEA_cityData', JSON.stringify(cityObj));
		setSearchedCities([]);
		SearchRef.current.querySelector('input[type=search]').value = '';
		setCityData(cityObj);
		setStatus('idle')
	}
	
	const searchFromRecent = (recentCity) => {
		const newCityObject = {
			city: recentCity.city,
			country: recentCity.country,
			state: recentCity.state,
			lat: recentCity.lat,
			lon: recentCity.lon
		}
		const recentCitiesArray = figureRecentCitiesArray(newCityObject);

		localStorage.setItem('TEA_recentCities', JSON.stringify(recentCitiesArray));
		localStorage.setItem('TEA_cityData', JSON.stringify(newCityObject));
		setRecentCities(recentCitiesArray);
		setCityData(newCityObject);
		setStatus('idle');
	}
	const changeBackgroundToImg = (e) => {
		const backgroundNumber = e.currentTarget.children[0].dataset.index;
		localStorage.setItem("TEA_backgroundType", 'photo');
		localStorage.setItem("TEA_backgroundNumber", backgroundNumber);
		setBackgroundType('photo');
		setBackgroundNumber(backgroundNumber)
	}
	const changeBackgroundToLapse = () => {
		localStorage.setItem("TEA_backgroundType", 'lapse');
		localStorage.setItem("TEA_backgroundNumber", '');
		setBackgroundType('lapse');
		setBackgroundNumber(null);
	}
	const changeBackgroundToCustom = () => {
		localStorage.setItem("TEA_backgroundType", 'custom');
		localStorage.setItem("TEA_backgroundNumber", '');
		setBackgroundType('custom');
		setBackgroundNumber(null);
	}

	const changeBackgroundToColor = (hex) => {
		localStorage.setItem("TEA_backgroundType", 'color');
		localStorage.setItem("TEA_backgroundNumber", '');
		setBackgroundType('color');
		setHexColor(hex);
		setBackgroundNumber(null);
	}

	const changeBackground = () => ModalService.open(BackgroundModal);
	const showShortcuts = () => ModalService.open(Shortcuts);
	const changeBackgroundShadow = (shadowValue) => setShadow(shadowValue);

	return (
		<Background bgType={backgroundType} bgNumber={backgroundNumber} hexColor={hexColor} shadowValue={shadow}>
			<ModalRoot 
				changeBackgroundToImg={changeBackgroundToImg} 
				changeBackgroundToLapse={changeBackgroundToLapse}
				changeBackgroundToCustom={changeBackgroundToCustom}
				changeBackgroundToColor={changeBackgroundToColor}
				changeBackgroundShadow={changeBackgroundShadow}
			/>
			<MenuContainer>
				<MenuBar 
					toggleDM={props.toggleDM}
					changeBackground={changeBackground}
					showShortcuts={showShortcuts}
				/>
			</MenuContainer>
			<WeatherContent>
				<CurrentWeatherData dayData={currentData} cityData={cityData} unit={unit} changeUnit={changeUnit} />
				<WeatherRecentDays>
					{
						recentCities &&
						recentCities.map((item, key) => <WeatherRecentDay key={key} onClick={() => searchFromRecent(item)}>{item.city}</WeatherRecentDay>)
					}
				</WeatherRecentDays>
				<WeatherSearchBox ref={SearchRef}>
					<WeatherSearchLabel active={searchedCities.length !== 0}>
						<WeatherSearchBtn active={searchedCities.length !== 0} onClick={searchForCities} value="Search" />
						<WeatherSearch active={searchedCities.length !== 0} placeholder="Change city..." />
					</WeatherSearchLabel>
					{searchedCities.length !== 0 && (
						<WeatherCitiesList active={searchedCities.length !== 0}>
							{searchedCities.map((item, index) => (
								<WeatherCitiesItem key={index} data-val={index} onClick={changeCity}>
									<WeatherCitiesItemData>
										<strong>{item.name}, {item.country}</strong><span>({item.state})</span>
									</WeatherCitiesItemData>
									<AiOutlinePlusCircle />
								</WeatherCitiesItem>	
							))}
						</WeatherCitiesList>
					)}
				</WeatherSearchBox>
				{
					data && chartData &&
					<Days days={days} daysInfo={daysInfo} changeDay={changeDay} weatherData={chartData} currentDay={activeChart} />
				}
				<ChartContainer>
					{
						data && chartData && <LineChart title={daysInfo.dayName[activeChart]} unit={unit} chartDays={chartData.days[activeChart]} chartIcons={chartData.icons[activeChart]} chartHours={chartData.hours[activeChart]} />
					}
				</ChartContainer>
			</WeatherContent>
		</Background>
	);
}
