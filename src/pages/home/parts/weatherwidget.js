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
import { UnitFromText } from "../../shared/helper/unit";

export default function WeatherWidget(props) {
	const menuRef = useRef("");
	const helpBtn = useRef("");
	const [UV, setUV] = useState("");
	const [helpUV, showHelpUV] = useState(false);

	const data = props.data;
	let symbolUnit = UnitFromText(props.unit);

	useEffect(() => {
		const uvNum = Math.round(data.current.uvi);
		if (uvNum <= 2) setUV("Low");
		else if (uvNum > 2 && uvNum <= 5) setUV("Moderate");
		else if (uvNum > 5 && uvNum <= 7) setUV("High");
		else if (uvNum > 7 && uvNum <= 10) setUV("Very high!");
		else setUV("Extreme high!!!");
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
								<MenuRow>Coords</MenuRow>
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
							<MenuRow>Sunrise and sunset</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="Sunrise time" src={Weathers.sunriseIco}></MenuIcon>
									<MenuRowData>{props.sr}</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="Sunset time" src={Weathers.sunsetIco}></MenuIcon>
									<MenuRowData>{props.ss}</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
							<MenuHr />

							<MenuRow>Temperature</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="Temperature" src={Weathers.termo1}></MenuIcon>
									<MenuRowData>
										{data.current.temp} {symbolUnit}
									</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="Temperature feelslike" src={Weathers.termo2}></MenuIcon>
									<MenuRowData>
										{data.current.feels_like} {symbolUnit}
									</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
						</ModalContainer>
						<ModalContainer flex col gap="5">
							<MenuHr />
							<MenuRow>More</MenuRow>

							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="% clouds" src={Weathers.cloud} />
									<MenuRowData>{data.current.clouds}%</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="wind speed" src={Weathers.wind} />
									<MenuRowData>{data.current.wind_speed} m/s</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="humidity" src={Weathers.humidity} />
									<MenuRowData>{data.current.humidity}%</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc>
									<MenuIcon title="wind direction" src={Weathers.winddir} />
									<MenuRowData>{props.windDir}</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
							<MenuRow>
								<MenuRowDesc fullWidth>
									<MenuIcon title="UV Index" src={Weathers.uvi} />
									<MenuRowData>{data.current.uvi}</MenuRowData>
									<span>{UV}</span>
									<UVHelp ref={helpBtn} onClick={() => showHelpUV(true)}>
										?
									</UVHelp>
									<UVHelpBox show={helpUV}>
										<MenuRow>
											<UVColor col="#11f57b" style={{color: '#000'}}>0-2</UVColor>
											<span>Low</span>
										</MenuRow>
										<MenuRow>
											<UVColor col="#e2f511" style={{color: '#000'}}>3-5</UVColor>
											<span>Medium</span>
										</MenuRow>

										<MenuRow>
											<UVColor col="#faa40f">6-7</UVColor>
											<span>High</span>
										</MenuRow>

										<MenuRow>
											<UVColor col="#fa0f46">8-10</UVColor>
											<span>Very High!</span>
										</MenuRow>

										<MenuRow>
											<UVColor col="#9c0ffa">11+</UVColor>
											<span>Extreme!!!</span>
										</MenuRow>
									</UVHelpBox>
								</MenuRowDesc>
							</MenuRow>
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="Visibility" src={Weathers.eye} />
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
									<MenuRow>Snow</MenuRow>
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
									<MenuRow>Rain</MenuRow>
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
