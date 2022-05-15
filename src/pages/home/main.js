import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
import {
	Content,
	FunctionBox,
	Greetings,
	Menu,
	MenuMoreWeatherInfo,
	MenuRow,
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
import Cards from "./parts/cards";
import Background from "../../layout/background";

const Home = () => {
	const [city, setCity] = useState("bralin");
	const [unit, setUnit] = useState("°C");
	const [menu, openMenu] = useState(false);
	const [options, openOptions] = useState(false);
	const optionsRef = useRef("");
	const [res, setRes] = useState();

	const [windDir, setWindDir] = useState("");
	const [data, setData] = useState([]);
	const [status, setStatus] = useState("idle");
	const [icon, setIcon] = useState(null);
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");

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

	const searchUrl = (e) => {
		e.preventDefault();
		const whatDoWeSearch = e.currentTarget.url.value;
		if (whatDoWeSearch === "") return;
		const setUrl = `https://www.google.com/search?q=${whatDoWeSearch}`;
		window.open(setUrl, "_blank");
		e.currentTarget.url.value = "";
	};

	if (status === "Done" && sunrise === "") setAdditionals();

	const addModal = () => {
		ModalService.open(AddtabModal);
	};

	const addEditModal = () => {
		ModalService.open(EdittabModal);
	};
	const refre = () => setRes({});

	return (
		<Background>
			{/* <ModalRoot refreshCards={refre} /> */}
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
				<Greetings>
					<span>{message} Taliyah!</span>
					<code>{`${new Date().getHours() < 10 ? "0" : ""}${new Date().getHours()}:${
						new Date().getMinutes() < 10 ? "0" : ""
					}${new Date().getMinutes()}`}</code>
				</Greetings>
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
				{localStorage.getItem("cardnames") && <Cards addCard={() => addModal} refresh={res} openEdit={() => addEditModal} />}
			</Content>
		</Background>
	);
};

export default Home;
