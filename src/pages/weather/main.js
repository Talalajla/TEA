import React, { useEffect, useState } from "react";
import ModalRoot from "../../components/modal/modalRoot";
import Background from "../../layout/background";
import { Content, MenuContainer } from "../../styles/home/main";
import useFetch from "../../hooks/useFetch";
import Days from "./components/days";
import MenuBar from "../shared/menubar";

const groupData = (weatherArr) => {
	const newArr = [];
	while (weatherArr.length) {
		const day = weatherArr.splice(0, 8);
		newArr.push(day);
	}
	return newArr;
}

export default function Weather(props) {
	const apikey = "0849360447e69eda07189e0b383ff858";
	const lat = '50.68';
	const lon = '17.93';
	const [days, setDays] = useState(null);
	const [daysInfo, setDaysInfo] = useState(null);

	const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);

	useEffect(() => {
		if (data) setDays(groupData(data.list));
	}, [data]);

	useEffect(() => {
		const generateNextDays = () => {
			const dayNamesList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			const dayInfo = {
				dayNumber: [],
				dayName: []
			}
			const today = new Date();
			var i = 0;
			while (i < 5) {
				const localDate = new Date().setDate(today.getDate() + i);
				const dayNameIndex = new Date(localDate).getDay();
				const dayNumber = new Date(localDate).getDate();
				dayInfo.dayName.push(dayNamesList[dayNameIndex])
				dayInfo.dayNumber.push(dayNumber);
				i++;
			}
			setDaysInfo(dayInfo);
		}
		generateNextDays();
	}, [])

	return (
		<Background>
			<ModalRoot />
			<MenuContainer>
				<MenuBar 
					toggleDM={props.toggleDM}
				/>
			</MenuContainer>
			<Content>
				<Days days={days} daysInfo={daysInfo} />
			</Content>
		</Background>
	);
}
