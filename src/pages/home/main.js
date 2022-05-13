import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Images from "./lapse/imgs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
import {
	Content,
	FunctionBox,
	Greetings,
	MainBackground,
	Menu,
	MenuMoreWeatherInfo,
	MenuRow,
	SearchBox,
	SearchForm,
	UrlInput,
	WeatherMenuInfo,
	Wrapper,
} from "../../styles/home/main";

import { useClickAway } from "react-use";
import WeatherWidget from "./parts/weatherwidget";

import ModalRoot from "../../components/modal/modalRoot";
import ModalService from "../../components/modal/services/modalService";
import AddtabModal from "./addtabModal";
import Cards from "./parts/cards";

const CurrentImage = styled.div`
	width: 100%;
	height: 100%;
	background-position: center bottom;
	background-image: ${({ nr }) => {
		const res = Object.entries(Images);
		let src;
		res.map((item) => (+item[0] === nr ? (src = item[1]) : null));
		return `url(${src})`;
	}};
`;

const Home = () => {
	const [city, setCity] = useState("bralin");
	const [unit, setUnit] = useState("°C");
	const [menu, openMenu] = useState(false);
	const [options, openOptions] = useState(false);
	const optionsRef = useRef("");

	const [windDir, setWindDir] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const [icon, setIcon] = useState(null);
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");

	const [hour, setHour] = useState();
	const [message, setMessage] = useState("Good morning, ");
	const apikey = "c60621f6b01ac75d9cb4f8afef300fdc";
	// const apikey = "0849360447e69eda07189e0b383ff858";

	useClickAway(
		optionsRef,
		() => {
			openOptions(false);
		},
		["mouseup"]
	);

	useEffect(() => {
		if (!city) return;
		const fetchData = async () => {
			setStatus("Fetching");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${apikey}`);
			const data = await response.json();
			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
			setStatus("Done");
			console.log("first load");
		};
		if (status === "idle") fetchData();
	}, [city, status]);

	useEffect(() => {
		const interval = setInterval(async () => {
			setStatus("Updating");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${apikey}`);
			const data = await response.json();
			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
			setStatus("Done");
			console.log("update");
		}, 1000 * 60 * 15);
		return () => {
			clearInterval(interval);
		};
	}, [city]);

	const figureTimeThings = () => {
		const hourNow = new Date().getHours();
		if (hour !== hourNow) {
			setHour(hourNow);
			figureMessage(hourNow);
		}
	};

	const setAdditionals = () => {
		const tdSunrise = new Date(data.sys.sunrise * 1000);
		const tdSunset = new Date(data.sys.sunset * 1000);
		const sunriseTime = `${tdSunrise.getHours()}:${tdSunrise.getMinutes() < 10 ? "0" : ""}${tdSunrise.getMinutes()}`;
		const sunsetTime = `${tdSunset.getHours()}:${tdSunset.getMinutes() < 10 ? "0" : ""}${tdSunset.getMinutes()}`;
		setSunrise(sunriseTime);
		setSunset(sunsetTime);

		const degrees = data.wind.deg;
		if (degrees < 22.5 || degrees >= 337.5) setWindDir("płn.");
		else if (degrees >= 22.5 && degrees < 67.5) setWindDir("płn. wsch.");
		else if (degrees >= 67.5 && degrees < 112.5) setWindDir("wsch.");
		else if (degrees >= 112.5 && degrees < 157.5) setWindDir("płd. wsch.");
		else if (degrees >= 157.5 && degrees < 202.5) setWindDir("płd.");
		else if (degrees >= 202.5 && degrees < 247.5) setWindDir("płd. zach.");
		else if (degrees >= 247.5 && degrees < 292.5) setWindDir("zach.");
		else if (degrees >= 292.5 && degrees < 337.5) setWindDir("płn. zach.");
	};

	const figureMessage = (hourNow) => {
		if (hourNow >= 6 && hourNow < 12) setMessage("Good morning, ");
		else if (hourNow >= 12 && hourNow < 18) setMessage("Good afternoon, ");
		else if ((hourNow >= 18 && hourNow <= 24) || hourNow < 6) setMessage("Good afternoon, ");
	};

	const searchUrl = (e) => {
		e.preventDefault();
		const whatDoWeSearch = e.currentTarget.url.value;
		if (whatDoWeSearch === "") return;
		const setUrl = `https://www.google.com/search?q=${whatDoWeSearch}`;
		window.open(setUrl, "_blank");
		e.currentTarget.url.value = "";
	};

	figureTimeThings();
	setInterval(() => figureTimeThings(), 1000);
	if (status === "Done" && sunrise === "") setAdditionals();

	const addModal = () => {
		ModalService.open(AddtabModal);
	};

	// console.log("loop");

	return (
		<Wrapper>
			<ModalRoot />
			<Menu>
				<HiMenuAlt4 onClick={() => openOptions(!options)} />
				<MenuMoreWeatherInfo ref={optionsRef} show={options} nopadd>
					<MenuRow padd hov onClick={addModal}>
						<AiOutlinePlusCircle />
						<span>Add new card</span>
					</MenuRow>
					<MenuRow padd hov>
						<BiCurrentLocation />
						<span>Change current city</span>
					</MenuRow>
				</MenuMoreWeatherInfo>
				{status === "Done" && (
					<>
						<WeatherWidget
							data={data}
							windDir={windDir}
							unit={unit}
							menu={menu}
							icon={icon}
							sr={sunrise}
							ss={sunset}
							toggleMenu={() => openMenu(!menu)}
							closeMenu={() => openMenu(false)}
						/>
						<WeatherMenuInfo>{data.name}</WeatherMenuInfo>
						<WeatherMenuInfo>
							{data.main.temp} <sup>{unit}</sup>
						</WeatherMenuInfo>
					</>
				)}
			</Menu>
			<Content>
				<Greetings>{message} Taliyah!</Greetings>
				<SearchForm onSubmit={searchUrl}>
					<SearchBox>
						<UrlInput name="url" placeholder="What do you want to search?" />
						<FunctionBox>
							<FcGoogle />
						</FunctionBox>
						<FunctionBox as="label" type="image" corner>
							<MdSearch />
							<input type="submit" />
						</FunctionBox>
					</SearchBox>
				</SearchForm>
				{localStorage.getItem("cardnames") && <Cards />}
			</Content>
			<MainBackground>
				<CurrentImage nr={hour} />
			</MainBackground>
		</Wrapper>
	);
};

export default Home;
