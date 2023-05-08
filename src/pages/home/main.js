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
import Shortcuts from "../shared/shortcutsModal";

const Home = (props) => {
	const [cityData, setCityData] = useState(null);

	const [unit, setUnit] = useState("");
	const [engine, setEngine] = useState("");
	const [time, setTime] = useState(
		`${new Date().getHours() < 10 ? "0" : ""}${new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" : ""}${new Date().getMinutes()}`
	);
	const alertsRef = useRef("");
	const [nickname, setNickname] = useState('');
	const [mark, setMark] = useState('');
	const [menu, openMenu] = useState(false);
	const [alerts, openAlerts] = useState(true);
	const [res, setRes] = useState();
	const [message, setMessage] = useState("Good morning");

	const [status, setStatus] = useState("idle");
	const [data, setData] = useState([]);
	const [windDir, setWindDir] = useState("");
	const [icon, setIcon] = useState(null);
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");
	
	const [backgroundType, setBackgroundType] = useState(null);
	const [backgroundNumber, setBackgroundNumber] = useState(null);
	const [hexColor, setHexColor] = useState('');
	const [shadow, setShadow] = useState(null);

	const searchRef = useRef(null);

	const apikey = "0849360447e69eda07189e0b383ff858";

	useClickAway(alertsRef, () => openAlerts(false), ["mouseup"]);

	useEffect(() => {
		if(!cityData)
			if (localStorage.getItem("TEA_cityData")) 
				setCityData(JSON.parse(localStorage.getItem("TEA_cityData")));
			else {
				const baseCityData = {"city":"Warsaw","country":"PL","state":"Masovian Voivodeship","lat":52.2319581,"lon":21.0067249};
				localStorage.setItem("TEA_cityData", JSON.stringify(baseCityData));
				setCityData(baseCityData);
			}
		if (!engine) 
			if (localStorage.getItem("searchengine"))
				setEngine(localStorage.getItem("searchengine"));
			else {
				const baseEngine = 'google';
				localStorage.setItem('searchengine', baseEngine);
				setEngine(baseEngine);
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
		if (!nickname)
			if(localStorage.getItem('TEA_nickname'))
				setNickname(localStorage.getItem('TEA_nickname'));
			else
				localStorage.setItem('TEA_nickname', '');
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
		if (!cityData) return;

		const fetchData = async () => {
			setStatus("Fetching");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
			const data = await response.json();

			const timeNow = new Date().getHours(); 
			let overrideIcon;
			if ((timeNow > 22) || (timeNow >= 0 && timeNow < 6)) {
				overrideIcon = data.current.weather[0].icon;
			} else {
				overrideIcon = data.current.weather[0].icon.replace('n', 'd');
			}
			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${overrideIcon}.png`);
			setStatus("Done");
		};
		if (status === "idle" || status === 'reload') 
		fetchData();
	}, [status, unit, cityData, backgroundType, engine, hexColor, shadow, nickname]);


	useEffect(() => {
		const interval = setInterval(async () => {
			setStatus("Updating");
			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=${unit}&appid=${apikey}`);
			const data = await response.json();

			setData(data);
			setIcon(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
			setStatus("Done");
			// update current city data every 15min
		}, 1000 * 60 * 15);
		return () => {
			clearInterval(interval);
		};
	}, [cityData, unit]);

	useEffect(() => {
		const interval = setInterval(() => {
			let hour = new Date().getHours();
			let mins = new Date().getMinutes();
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
			} else if (e.shiftKey && e.keyCode === 70) {
				e.preventDefault();
				searchRef.current.focus();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}

	}, []);

	useEffect(() => {
		const msg = rollMessage();
		setMessage(msg);
	}, []);

	const rollMessage = () => {
		let msg, time = '';
		const hour = new Date().getHours();
		const messages = [
			'Hello',
			'Hi',
			'Time to work',
			"Hope you're fine",
			'Good ',
			'Have a good ',
			'How you feel this ',
		]
		const randomNum = Math.floor(Math.random() * messages.length);
		if (randomNum > 3) {
			if (hour >= 5 && hour < 12) time = 'morning';
			else if (hour >= 12 && hour < 18) time = 'afternoon';
			else time = 'evening';
		}
		if (randomNum === messages.length - 1) {
			setMark('?');
		} else {
			setMark('!');
		}
		msg = `${messages[randomNum]}${time}`;

		return msg;
	}

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

		const searchInNew = localStorage.getItem('TEA_searchInNewWindow');
		
		const whatDoWeSearch = e.currentTarget.url.value;

		const specialChars = ['#', '%', '&'];
		let formatSearchInput = whatDoWeSearch;
		specialChars.some((element) => {
			if (whatDoWeSearch.includes(element)) {
				formatSearchInput = whatDoWeSearch
					.replace('%', '%25')
					.replace('#', '%23')
					.replace('&', '%26');
			}
		});

		if (formatSearchInput === "") return;
		const setUrl = `${enginePrefix}${formatSearchInput}`;
		window.open(setUrl, !!searchInNew ? '_blank' : '_self');
		e.currentTarget.url.value = "";
	};

	if (status === "Done" && sunrise === "") setAdditionals();

	const addModal = () => ModalService.open(AddtabModal);
	const addEditModal = () => ModalService.open(EdittabModal);
	const changeCity = () => ModalService.open(CityModal);
	const changeBackground = () => ModalService.open(BackgroundModal);
	const configModal = () => ModalService.open(ConfigModal);
	const openWidget = () => ModalService.open(WidgetMobile);
	const showShortcuts = () => ModalService.open(Shortcuts);
	const refreshCards = () => setRes({});
	const refreshConfig = () => {
		setEngine(localStorage.getItem("searchengine"));
		setUnit(localStorage.getItem("tempunit"));
	};
	const refreshNickname = () => setNickname(localStorage.getItem('TEA_nickname'));
	const refreshData = () => {
		setCityData(JSON.parse(localStorage.getItem('TEA_cityData')));
		setStatus('reload');
	};
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
		setHexColor(hex);
		setBackgroundType('color');
		setBackgroundNumber(null);
	}
	const changeBackgroundShadow = (shadowValue) => setShadow(shadowValue);

	return (
		<Background bgType={backgroundType} bgNumber={backgroundNumber} hexColor={hexColor} shadowValue={shadow}>
			<ModalRoot 
				data={data} 
				wdir={windDir} 
				changeBackgroundToImg={changeBackgroundToImg} 
				changeBackgroundToLapse={changeBackgroundToLapse} 
				changeBackgroundToCustom={changeBackgroundToCustom}
				changeBackgroundToColor={changeBackgroundToColor}
				changeBackgroundShadow={changeBackgroundShadow}
				refreshCards={refreshCards} 
				refreshData={refreshData} 
				refreshEngines={refreshConfig} 
				refreshNickname={refreshNickname}
			/>
			<ModalContainer flex>
				<MenuContainer>
					<MenuBar
						toggleDM={props.toggleDM} 
						addModal={addModal}
						changeCity={changeCity}
						changeBackground={changeBackground}
						configModal={configModal}
						showShortcuts={showShortcuts}
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
					<span>{message}{nickname ? ',' : ''} <strong>{nickname ? ` ${nickname}` : ''}{mark}</strong></span>
					<code>{time}</code>
				</Greetings>
				<SearchForm onSubmit={searchUrl}>
					<SearchBox>
						<UrlInput autoFocus ref={searchRef} name="url" placeholder="Search something..." />
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
