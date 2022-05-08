import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Images from "./lapse/imgs";
import { MdSearch } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { HiMenuAlt4 } from "react-icons/hi";
import {
	Content,
	FunctionBox,
	Greetings,
	MainBackground,
	Menu,
	MenuHr,
	MenuIcon,
	MenuMoreWeatherInfo,
	MenuRow,
	MenuRowData,
	MenuRowDesc,
	SearchBox,
	SearchForm,
	UrlInput,
	WeatherIconCircle,
	WeatherMenuInfo,
	Wrapper,
} from "../../styles/home/main";
// More Menu Icons
import sunriseIco from "../../files/home/sunrise.png";
import sunsetIco from "../../files/home/sunset.png";
import termo1 from "../../files/home/termo1.png";
import termo2 from "../../files/home/termo2.png";
import rain from "../../files/home/water.png";
import cloud from "../../files/home/cloud.png";
import snow from "../../files/home/snowflake.png";
import humidity from "../../files/home/humidity.png";
import wind from "../../files/home/wind.png";
import winddir from "../../files/home/winddir.png";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useClickAway } from "react-use";

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
	const [city, setCity] = useState("Bralin");
	const [unit, setUnit] = useState("°C");
	const [menu, openMenu] = useState(false);
	const menuRef = useRef("");

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
		menuRef,
		() => {
			openMenu(false);
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
	}, [city]);

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
		console.log(degrees);
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

	return (
		<Wrapper>
			<Menu>
				<HiMenuAlt4 />
				{status === "Done" && (
					<>
						<WeatherIconCircle ref={menuRef}>
							<img src={icon} alt="weather icon" onClick={() => openMenu(!menu)} />
							<MenuMoreWeatherInfo show={menu}>
								<MenuRow space>
									<MenuRowData>{data.name}</MenuRowData>
									<MenuRowData>{data.sys.country}</MenuRowData>
								</MenuRow>
								<MenuRow>{data.weather[0].description}</MenuRow>
								<MenuHr />
								<MenuRow>Wschód i zachód słońca</MenuRow>
								<MenuRow>
									<MenuRowDesc>
										<MenuIcon title="wschód słońca" src={sunsetIco}></MenuIcon>
										<MenuRowData>{sunset}</MenuRowData>
									</MenuRowDesc>
									<MenuRowDesc>
										<MenuIcon title="zachód słońca" src={sunriseIco}></MenuIcon>
										<MenuRowData>{sunrise}</MenuRowData>
									</MenuRowDesc>
								</MenuRow>
								<MenuHr />
								<MenuRow>Temperatura</MenuRow>
								<MenuRow>
									<MenuRowDesc>
										<MenuIcon title="temperatura" src={termo1}></MenuIcon>
										<MenuRowData>
											{data.main.temp} {unit}
										</MenuRowData>
									</MenuRowDesc>
									<MenuRowDesc>
										<MenuIcon title="temperatura odczuwalna" src={termo2}></MenuIcon>
										<MenuRowData>
											{data.main.feels_like} {unit}
										</MenuRowData>
									</MenuRowDesc>
								</MenuRow>
								<MenuRow>
									<MenuRowDesc col="green">
										<MdKeyboardArrowUp title="temperatura minimalna" />
										<MenuRowData>
											{data.main.temp_min} {unit}
										</MenuRowData>
									</MenuRowDesc>
									<MenuRowDesc col="red">
										<MdKeyboardArrowDown title="temperatura maksymalna" />
										<MenuRowData>
											{data.main.temp_max} {unit}
										</MenuRowData>
									</MenuRowDesc>
								</MenuRow>
								{data.snow && (
									<>
										<MenuHr />
										<MenuRow>Opady śniegu</MenuRow>
										<MenuRow>
											<MenuRowDesc>
												<MenuIcon title="wysokość opadów śniegu, ostatnia godzina" src={snow} />
												<MenuRowData>{data.snow["1h"]}mm</MenuRowData>
											</MenuRowDesc>
											{data.snow["3h"] && (
												<MenuRowDesc>
													<MenuIcon title="wysokość opadów śniegu, ostatnie 3 godziny" src={snow} />
													<MenuRowData>{data.snow["3h"]}mm</MenuRowData>
												</MenuRowDesc>
											)}
										</MenuRow>
									</>
								)}
								{data.rain && (
									<>
										<MenuHr />
										<MenuRow>Opady deszczu</MenuRow>
										<MenuRow>
											<MenuRowDesc>
												<MenuIcon title="wysokość opadów deszczu, ostatnia godzina" src={rain} />
												<MenuRowData>{data.rain["1h"]} mm</MenuRowData>
											</MenuRowDesc>
											{data.rain["3h"] && (
												<MenuRowDesc>
													<MenuIcon title="wysokość opadów deszczu, ostatnie 3 godziny" src={rain} />
													<MenuRowData>{data.rain["3h"]} mm</MenuRowData>
												</MenuRowDesc>
											)}
										</MenuRow>
									</>
								)}
								<MenuHr />
								<MenuRow>Dodatkowe</MenuRow>

								<MenuRow>
									<MenuRowDesc>
										<MenuIcon title="procent zachmurzenia" src={cloud} />
										<MenuRowData>{data.clouds.all}%</MenuRowData>
									</MenuRowDesc>
									<MenuRowDesc>
										<MenuIcon title="prędkość wiatru" src={wind} />
										<MenuRowData>{data.wind.speed} m/s</MenuRowData>
									</MenuRowDesc>
								</MenuRow>
								<MenuRow>
									<MenuRowDesc>
										<MenuIcon title="wilgotność powietrza" src={humidity} />
										<MenuRowData>{data.main.humidity}%</MenuRowData>
									</MenuRowDesc>
									<MenuRowDesc>
										<MenuIcon title="kierunek wiatru" src={winddir} />
										<MenuRowData>{windDir}</MenuRowData>
									</MenuRowDesc>
								</MenuRow>
								<MenuHr />
								<MenuRow>
									<MenuRowDesc>Dane z godz.</MenuRowDesc>
									<MenuRowDesc>
										{new Date(data.dt * 1000).getHours() < 10 ? "0" : ""}
										{new Date(data.dt * 1000).getHours()}:{new Date(data.dt * 1000).getMinutes() < 10 ? "0" : ""}
										{new Date(data.dt * 1000).getMinutes()}
									</MenuRowDesc>
								</MenuRow>
							</MenuMoreWeatherInfo>
						</WeatherIconCircle>
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
			</Content>
			<MainBackground>
				<CurrentImage nr={hour} />
			</MainBackground>
		</Wrapper>
	);
};

export default Home;
