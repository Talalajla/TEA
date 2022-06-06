import React, { useEffect, useRef, useState } from "react";

import Weathers from "../../../files/home/weatherIcons";
import {
	MenuHr,
	MenuIcon,
	MenuMoreWeatherInfo,
	MenuRow,
	MenuRowData,
	MenuRowDesc,
	UVColor,
	UVHelp,
	UVHelpBox,
	WeatherIconCircle,
} from "../../../styles/home/main";
import { useClickAway } from "react-use";
import { ModalContainer } from "../../../styles/modal/main";

export default function WeatherWidget(props) {
	const menuRef = useRef("");
	const helpBtn = useRef("");
	const [UV, setUV] = useState("");
	const [helpUV, showHelpUV] = useState(false);

	const data = props.data;
	let symbolUnit;
	if (props.unit === "metric") symbolUnit = "°C";
	else if (props.unit === "imperial") symbolUnit = "°F";
	else if (props.unit === "default") symbolUnit = "°K";

	useEffect(() => {
		const uvNum = Math.round(data.current.uvi);
		if (uvNum <= 2) setUV("Low");
		else if (uvNum > 2 && uvNum <= 5) setUV("Moderate");
		else if (uvNum > 5 && uvNum <= 7) setUV("High");
		else if (uvNum > 7 && uvNum <= 10) setUV("Very high!");
		else setUV("Extreme high!!!");
		console.log("figure uv", uvNum);
	}, [data]);

	useClickAway(menuRef, () => props.closeMenu(), ["mouseup"]);
	useClickAway(helpBtn, () => showHelpUV(false), ["mouseup"]);

	return (
		<>
			<WeatherIconCircle isopen={props.menu} ref={menuRef}>
				<img src={props.icon} alt="weather icon" onClick={() => props.toggleMenu()} />
				<MenuMoreWeatherInfo show={props.menu} widget>
					<MenuRow space bigfz>
						<MenuRowData>{props.cityname}</MenuRowData>
						<MenuRowData>{props.country}</MenuRowData>
					</MenuRow>
					<MenuRow space>
						<MenuRowData>{data.current.weather[0].description}</MenuRowData>
						<MenuRowData mobile>
							Lat: {Math.round(data.lat * 100) / 100}°, Lon: {Math.round(data.lon * 100) / 100}°
						</MenuRowData>
					</MenuRow>
					<ModalContainer flex col mobileSwap>
						<ModalContainer flex col gap="5">
							<ModalContainer flex col gap="5" notmobile>
								<MenuHr />
								<MenuRow>Coords:</MenuRow>
								<MenuRow>
									<MenuRowDesc>
										<MenuRowData>Lat: </MenuRowData>
										<MenuRowData>{Math.round(data.lat * 100) / 100}°</MenuRowData>
									</MenuRowDesc>
									<MenuRowDesc>
										<MenuRowData>Lon: </MenuRowData>
										<MenuRowData>{Math.round(data.lon * 100) / 100}°</MenuRowData>
									</MenuRowDesc>
								</MenuRow>
							</ModalContainer>

							<MenuHr />
							<MenuRow>Wschód i zachód słońca</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="wschód słońca" src={Weathers.sunriseIco}></MenuIcon>
									<MenuRowData>{props.sr}</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="zachód słońca" src={Weathers.sunsetIco}></MenuIcon>
									<MenuRowData>{props.ss}</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
							<MenuHr />

							<MenuRow>Temperatura</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="temperatura" src={Weathers.termo1}></MenuIcon>
									<MenuRowData>
										{data.current.temp} {symbolUnit}
									</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="temperatura odczuwalna" src={Weathers.termo2}></MenuIcon>
									<MenuRowData>
										{data.current.feels_like} {symbolUnit}
									</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
						</ModalContainer>
						<ModalContainer flex col gap="5">
							<MenuHr />
							<MenuRow>Dodatkowe</MenuRow>

							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="procent zachmurzenia" src={Weathers.cloud} />
									<MenuRowData>{data.current.clouds}%</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="prędkość wiatru" src={Weathers.wind} />
									<MenuRowData>{data.current.wind_speed} m/s</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="wilgotność powietrza" src={Weathers.humidity} />
									<MenuRowData>{data.current.humidity}%</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="kierunek wiatru" src={Weathers.winddir} />
									<MenuRowData>{props.windDir}</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
							<MenuRow>
								<MenuRowDesc fullWidth>
									<MenuIcon title="Indeks UV" src={Weathers.uvi} />
									<MenuRowData>{data.current.uvi}</MenuRowData>
									<span>{UV}</span>
									<UVHelp ref={helpBtn} onClick={() => showHelpUV(true)}>
										?
									</UVHelp>
									<UVHelpBox show={helpUV}>
										<MenuRow>
											<UVColor col="#11f57b">0-2</UVColor>
											<span>Niska</span>
										</MenuRow>
										<MenuRow>
											<UVColor col="#e2f511">3-5</UVColor>
											<span>Średnia</span>
										</MenuRow>

										<MenuRow>
											<UVColor col="#faa40f">6-7</UVColor>
											<span>Wysoka</span>
										</MenuRow>

										<MenuRow>
											<UVColor col="#fa0f46">8-10</UVColor>
											<span>Bardzo wysoka!</span>
										</MenuRow>

										<MenuRow>
											<UVColor col="#9c0ffa">11+</UVColor>
											<span>Ekstremalna!!!</span>
										</MenuRow>
									</UVHelpBox>
								</MenuRowDesc>
							</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="Widoczność" src={Weathers.eye} />
									<MenuRowData>
										{Math.round(data.current.visibility / 10) / 100}
										{data.current.visibility === 10000 && "+"} km
									</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc></MenuRowDesc>
							</MenuRow>
							{data.current.snow && (
								<>
									<MenuHr />
									<MenuRow>Opady śniegu</MenuRow>
									<MenuRow>
										<MenuRowDesc>
											<MenuIcon title="wysokość opadów śniegu, ostatnia godzina" src={Weathers.snow} />
											<MenuRowData>{data.current.snow["1h"]}mm</MenuRowData>
										</MenuRowDesc>
									</MenuRow>
								</>
							)}
							{data.current.rain && (
								<>
									<MenuHr />
									<MenuRow>Opady deszczu</MenuRow>
									<MenuRow>
										<MenuRowDesc>
											<MenuIcon title="wysokość opadów deszczu, ostatnia godzina" src={Weathers.rain} />
											<MenuRowData>{data.current.rain["1h"]} mm</MenuRowData>
										</MenuRowDesc>
									</MenuRow>
								</>
							)}
						</ModalContainer>
					</ModalContainer>
				</MenuMoreWeatherInfo>
			</WeatherIconCircle>
			<WeatherIconCircle mobile>
				<img src={props.icon} alt="weather icon" onClick={() => props.widgetModal()} />
			</WeatherIconCircle>
		</>
	);
}
