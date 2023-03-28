import React, { useEffect, useRef, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { DiBingSmall } from "react-icons/di";
import { FaYahoo, FaYoutube, FaTwitch, FaReddit } from "react-icons/fa";
import { FcGoogle, FcWikipedia } from "react-icons/fc";
import { MdSearch } from "react-icons/md";
import { SiDuckduckgo } from "react-icons/si";
import amazon from "../../styles/home/amazon.png";
import {
	AlertBox,
	AlertDesc,
	AlertRow,
	AlertSource,
	AlertTimes,
	AlertTitle,
	AlertTop,
	Content,
	FunctionBox,
	Greetings,
	MenuContainer,
	MenuMoreWeatherInfo,
	MenuTitle,
	SearchBox,
	SearchForm,
	UrlInput,
	WeatherMenuInfo,
} from "../../styles/home/main";

import { useClickAway } from "react-use";
import WeatherWidget from "./parts/weatherwidget";

import ModalRoot from "../../components/modal/modalRoot";
import ModalService from "../../components/modal/services/modalService";
import AddtabModal from "./addtabModal";
import EdittabModal from "./edittabModal";
import CityModal from "./cityModal";
import ConfigModal from "./configModal";
import WidgetMobile from "./mobileWidget";

import Cards from "./parts/cards";
import Background from "../../layout/background";
import { ModalContainer } from "../../styles/modal/main";
import MenuBar from "../shared/menubar";
import { Link } from "react-router-dom";
import BackgroundModal from "./changeBackgroundModal";

const Home = (props) => {
	const [cityData, setCityData] = useState(null);

	const [unit, setUnit] = useState("");
	const [engine, setEngine] = useState("");
	const [time, setTime] = useState(
		`${new Date().getHours() < 10 ? "0" : ""}${new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" : ""}${new Date().getMinutes()}`
	);
	const alertsRef = useRef("");
	const [menu, openMenu] = useState(false);
	const [alerts, openAlerts] = useState(true);
	const [res, setRes] = useState();
	const [message, setMessage] = useState("Good morning, ");

	const [status, setStatus] = useState("idle");
	const [data, setData] = useState([]);
	const [windDir, setWindDir] = useState("");
	const [icon, setIcon] = useState(null);
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");

	const searchRef = useRef(null);

	const apikey = "c60621f6b01ac75d9cb4f8afef300fdc";
	// const apikey = "0849360447e69eda07189e0b383ff858";

	useClickAway(alertsRef, () => openAlerts(false), ["mouseup"]);

	useEffect(() => {
		if (!cityData && localStorage.getItem("TED_cityData")) setCityData(JSON.parse(localStorage.getItem("TED_cityData")));
		if (!engine && localStorage.getItem("searchengine")) setEngine(localStorage.getItem("searchengine"));
		if (!unit && localStorage.getItem("tempunit")) setUnit(localStorage.getItem("tempunit"));
		if (!cityData) return;

		console.log('citydata should change');

		let hour = new Date().getHours();
		if (hour >= 5 && hour < 12) setMessage("Good morning, ");
		else if (hour >= 12 && hour < 18) setMessage("Good afternoon, ");
		else setMessage("Good evening, ");

		const fetchData = async () => {
			setStatus("Fetching");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
			const data = await response.json();
			console.log("ONECALL/: ", response, data);
			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
			console.log('citydata changed');
			setStatus("Done");
			console.log("first load");
		};
		if (status === "idle" || status === 'reload') 
		fetchData();
	}, [status, unit, cityData]);

	useEffect(() => {
		const interval = setInterval(async () => {
			setStatus("Updating");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
			const data = await response.json();

			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
			setStatus("Done");
			console.log("update (15min)");
		}, 1000 * 60 * 15);
		return () => {
			clearInterval(interval);
		};
	}, [cityData, unit]);

	useEffect(() => {
		const interval = setInterval(() => {
			let hour = new Date().getHours();
			let mins = new Date().getMinutes();
			if (hour >= 6 && hour < 12) setMessage("Good morning, ");
			else if (hour >= 12 && hour < 18) setMessage("Good afternoon, ");
			else setMessage("Good evening, ");
			const result = `${hour < 10 ? "0" : ""}${hour}:${mins < 10 ? "0" : ""}${mins}`;
			setTime(result);
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (searchRef.current === document.activeElement) return;
			if (e.shiftKey && e.keyCode === 71) {
				localStorage.setItem('searchengine', 'google');
				setEngine('google');
			} else if (e.shiftKey && e.keyCode === 68) {
				localStorage.setItem('searchengine', 'duckduckgo');
				setEngine('duckduckgo');
			} else if (e.shiftKey && e.keyCode === 66) {
				localStorage.setItem('searchengine', 'bing');
				setEngine('bing');
			} else if (e.shiftKey && e.keyCode === 49) {
				localStorage.setItem('searchengine', 'yahoo');
				setEngine('yahoo');
			} else if (e.shiftKey && e.keyCode === 65) {
				localStorage.setItem('searchengine', 'amazon');
				setEngine('amazon');
			} else if (e.shiftKey && e.keyCode === 82) {
				localStorage.setItem('searchengine', 'reddit');
				setEngine('reddit');
			} else if (e.shiftKey && e.keyCode === 84) {
				localStorage.setItem('searchengine', 'twitch');
				setEngine('twitch');
			} else if (e.shiftKey && e.keyCode === 89) {
				localStorage.setItem('searchengine', 'youtube');
				setEngine('youtube');
			} else if (e.shiftKey && e.keyCode === 87) {
				localStorage.setItem('searchengine', 'wikipedia');
				setEngine('wikipedia');
			} 
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}

	}, []);
	console.log(engine);

	const setAdditionals = () => {
		const tdSunrise = new Date(data.current.sunrise * 1000);
		const tdSunset = new Date(data.current.sunset * 1000);
		const sunriseTime = `${tdSunrise.getHours()}:${tdSunrise.getMinutes() < 10 ? "0" : ""}${tdSunrise.getMinutes()}`;
		const sunsetTime = `${tdSunset.getHours()}:${tdSunset.getMinutes() < 10 ? "0" : ""}${tdSunset.getMinutes()}`;
		setSunrise(sunriseTime);
		setSunset(sunsetTime);

		const degrees = data.current.wind_deg;
		if (degrees < 22.5 || degrees >= 337.5) setWindDir("N");
		else if (degrees >= 22.5 && degrees < 67.5) setWindDir("NE");
		else if (degrees >= 67.5 && degrees < 112.5) setWindDir("E");
		else if (degrees >= 112.5 && degrees < 157.5) setWindDir("SE");
		else if (degrees >= 157.5 && degrees < 202.5) setWindDir("S");
		else if (degrees >= 202.5 && degrees < 247.5) setWindDir("SW");
		else if (degrees >= 247.5 && degrees < 292.5) setWindDir("W");
		else if (degrees >= 292.5 && degrees < 337.5) setWindDir("NW");
	};

	const searchUrl = (e) => {
		e.preventDefault();
		let enginePrefix;
		if (engine === "google") enginePrefix = "https://www.google.com/search?q=";
		else if (engine === "bing") enginePrefix = "https://www.bing.com/search?q=";
		else if (engine === "yahoo") enginePrefix = "https://search.yahoo.com/search?p=";
		else if (engine === "amazon") enginePrefix = "https://www.amazon.com/s?k=";
		else if (engine === "reddit") enginePrefix = "https://www.reddit.com/search/?q=";
		else if (engine === "twitch") enginePrefix = "https://www.twitch.tv/search?term=";
		else if (engine === "youtube") enginePrefix = "https://www.youtube.com/results?search_query=";
		else if (engine === "wikipedia") enginePrefix = "https://en.wikipedia.org/w/index.php?search=";
		else enginePrefix = "https://duckduckgo.com/?q=";

		const whatDoWeSearch = e.currentTarget.url.value;
		if (whatDoWeSearch === "") return;
		const setUrl = `${enginePrefix}${whatDoWeSearch}`;
		window.open(setUrl, "_blank");
		e.currentTarget.url.value = "";
	};

	if (status === "Done" && sunrise === "") setAdditionals();

	const addModal = () => ModalService.open(AddtabModal);
	const addEditModal = () => ModalService.open(EdittabModal);
	const changeCity = () => ModalService.open(CityModal);
	const changeBackground = () => ModalService.open(BackgroundModal);
	const configModal = () => ModalService.open(ConfigModal);
	const openWidget = () => ModalService.open(WidgetMobile);
	const refreshCards = () => setRes({});
	const refreshConfig = () => {
		setEngine(localStorage.getItem("searchengine"));
		setUnit(localStorage.getItem("tempunit"));
	};
	const refreshData = () => {
		setCityData(JSON.parse(localStorage.getItem('TED_cityData')));
		setStatus('reload');
	};
	return (
		<Background>
			<ModalRoot data={data} wdir={windDir} refreshCards={refreshCards} refreshData={refreshData} refreshEngines={refreshConfig} />
			<ModalContainer flex>
				<MenuContainer>
					<MenuBar
						toggleDM={props.toggleDM} 
						addModal={addModal}
						changeCity={changeCity}
						changeBackground={changeBackground}
						configModal={configModal}
						page="landing"
					/>

					{status === "Done" && (
						<ModalContainer flex jccenter aicenter>
							<WeatherWidget
								data={data}
								cityname={cityData.city}
								country={cityData.country}
								windDir={windDir}
								unit={unit}
								menu={menu}
								icon={icon}
								sr={sunrise}
								ss={sunset}
								toggleMenu={() => openMenu(!menu)}
								closeMenu={() => openMenu(false)}
								widgetModal={() => openWidget(true)}
							/>
							<WeatherMenuInfo as={Link} to="/weather">{cityData.city}</WeatherMenuInfo>
							<WeatherMenuInfo as={Link} to="/weather">
								{data.current.temp}
								<sup>
									{unit === "metric" ? "°C" : null}
									{unit === "imperial" ? "°F" : null}
									{unit === "default" ? "°K" : null}
								</sup>
							</WeatherMenuInfo>
							{data.alerts && (
								<>
									<AlertBox>
										<BsExclamationLg onClick={() => openAlerts(true)} />
									</AlertBox>
									<MenuMoreWeatherInfo alerts nopadd ref={alertsRef} show={alerts}>
										<MenuTitle>Active alerts:</MenuTitle>
										{data.alerts.map((alert, index) => {
											const from = new Date(alert.start * 1000);
											const to = new Date(alert.end * 1000);
											const fromTime = `${from.getHours()}:${from.getMinutes() < 10 ? "0" : ""}${from.getMinutes()}`;
											const toTime = `${to.getHours()}:${to.getMinutes() < 10 ? "0" : ""}${to.getMinutes()}`;

											return (
												<AlertRow key={index}>
													<AlertTop>
														<AlertTitle>{alert.event}!</AlertTitle>
														<AlertTimes title="estimated time">
															<span>{fromTime}</span>-<span>{toTime}</span>
														</AlertTimes>
													</AlertTop>
													<AlertDesc>{alert.description}</AlertDesc>
													<AlertSource>
														<span>Source:</span>
														<span>{alert.sender_name}</span>
													</AlertSource>
												</AlertRow>
											);
										})}
									</MenuMoreWeatherInfo>
								</>
							)}
						</ModalContainer>
					)}
				</MenuContainer>
			</ModalContainer>

			<Content>
				<Greetings>
					<span>{message} Taliyah!</span>
					<code>{time}</code>
				</Greetings>
				<SearchForm onSubmit={searchUrl}>
					<SearchBox>
						<UrlInput ref={searchRef} name="url" placeholder="Search something..." />
						<FunctionBox engine={engine} onClick={configModal}>
							{engine === "google" && <FcGoogle />}
							{engine === "bing" && <DiBingSmall />}
							{engine === "yahoo" && <FaYahoo />}
							{engine === "duckduckgo" && <SiDuckduckgo />}
							{engine === "amazon" && <img src={amazon} width="20" height="20" alt="Amazon logo" />}
							{engine === "reddit" && <FaReddit />}
							{engine === "twitch" && <FaTwitch />}
							{engine === "youtube" && <FaYoutube />}
							{engine === "wikipedia" && <FcWikipedia />}
						</FunctionBox>
						<FunctionBox as="label" type="image" corner>
							<MdSearch />
							<input type="submit" />
						</FunctionBox>
					</SearchBox>
				</SearchForm>
				{localStorage.getItem("cardnames") && <Cards addCard={() => addModal} refresh={res} openEdit={() => addEditModal} />}
			</Content>
		</Background>
	);
};

export default Home;
