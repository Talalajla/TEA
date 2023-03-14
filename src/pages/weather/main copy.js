import React, { useEffect, useState } from "react";
import ModalRoot from "../../components/modal/modalRoot";
import Background from "../../layout/background";
import { Content, MenuContainer } from "../../styles/home/main";
import useFetch from "../../hooks/useFetch";
import Days from "./components/days";
import MenuBar from "../shared/menubar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/linechart";
import zoomPlugin from "chartjs-plugin-zoom";
import { ChartContainer } from "../../styles/weather/chart";

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
	console.log(newArr);
	for(var i=0; i<newArr.length; i++) {
		let dataToClone;
		if (i < newArr.length - 1)
			dataToClone = newArr[i+1][0];
		// console.log(dataToClone);
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

const fillChartWithData = (days, hours) => {
	const chartDataObject = { days, hours }
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
		console.log(dateTemplate);
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
	const [cityData, setCityData] = useState({
		city: 'Warsaw',
		Country: 'PL',
		lat: '52.2319581',
		lon: '21.0067249',
		state: 'Masovian Voivodeship'
	});
	const [days, setDays] = useState(null);
	const [daysInfo, setDaysInfo] = useState(null);
	const [chartDays, setChartDays] = useState(null);
	const [chartHours, setChartHours] = useState(null);
	const [chartData, setChartData] = useState(null);
	const [activeChart, setActiveChart] = useState(0); //today
	const [unit, setUnit] = useState();
	
	// const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
	
	let data ='';
	useEffect(() => {
		const storedUnit = localStorage.getItem("tempunit");
		const storedCityData = localStorage.getItem("TED_cityData");
		if (storedUnit) setUnit(storedUnit);
		if (storedCityData) setCityData(JSON.parse(storedCityData));
	  }, []);
	
	
	useEffect(() => data && setDays(groupData(data.list)), [data]);
	useEffect(() => days && setChartDays(extractDaysData(days)), [days]);
	useEffect(() => days && setChartHours(extractHoursData(days)), [days]);
	useEffect(() => chartDays && chartHours && setChartData(fillChartWithData(chartDays, chartHours)), [chartDays, chartHours, data]);
	useEffect(() => days && setDaysInfo(generateNextDays(days)), [days]);

	const changeDay = (e) => setActiveChart(e.currentTarget.value);

	return (
		<Background>
			<ModalRoot />
			<MenuContainer>
				<MenuBar 
					toggleDM={props.toggleDM}
				/>
			</MenuContainer>
			<Content>
				<Days days={days} daysInfo={daysInfo} changeDay={changeDay} />
				<ChartContainer>
					{
						data && chartData && <LineChart title={daysInfo.dayName[activeChart]} unit={unit} chartDays={chartData.days[activeChart]} chartHours={chartData.hours[activeChart]} />
					}
				</ChartContainer>
			</Content>
		</Background>
	);
}
