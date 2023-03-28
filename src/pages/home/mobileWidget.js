import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { CornerClose, ModalContainer } from "../../styles/modal/main";
import { MenuIcon, MenuRow, MenuRowData, MenuRowDesc, UVColor, UVHelp, UVHelpBox } from "../../styles/home/main";
import WeatherIcons from "../../files/home/weatherIcons";
import { useClickAway } from "react-use";

const MobileWidget = (props) => {
	const data = props.data;

	const helpBtn = useRef("");
	const [helpUV, showHelpUV] = useState(false);
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");

	let symbolUnit;

	if (localStorage.getItem("tempunit") === "metric") symbolUnit = "°C";
	else if (localStorage.getItem("tempunit") === "imperial") symbolUnit = "°F";
	else if (localStorage.getItem("tempunit") === "default") symbolUnit = "°K";

	useEffect(() => {
		const tdSunrise = new Date(data.current.sunrise * 1000);
		const tdSunset = new Date(data.current.sunset * 1000);
		const sunriseTime = `${tdSunrise.getHours()}:${tdSunrise.getMinutes() < 10 ? "0" : ""}${tdSunrise.getMinutes()}`;
		const sunsetTime = `${tdSunset.getHours()}:${tdSunset.getMinutes() < 10 ? "0" : ""}${tdSunset.getMinutes()}`;
		setSunrise(sunriseTime);
		setSunset(sunsetTime);
	}, [data]);

	useClickAway(helpBtn, () => showHelpUV(false), ["mouseup"]);

	return (
		<Modal>
			<CornerClose onClick={() => props.close()}>&#215;</CornerClose>
			<ModalPartHeader>
				Weather {localStorage.getItem("cityName")}
				<ModalContainer flex jccenter>
					({data.current.weather[0].description})
				</ModalContainer>
			</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer flex col>
					<ModalContainer flex col gap="3">
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon />
								<MenuRowData>Coords (lat): </MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{Math.round(data.lat * 100) / 100}°</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon />
								<MenuRowData>Coords (lon): </MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{Math.round(data.lon * 100) / 100}°</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="wschód słońca" src={WeatherIcons.sunriseIco}></MenuIcon>
								<MenuRowData>Sunrise: </MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{sunrise}</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="zachód słońca" src={WeatherIcons.sunsetIco}></MenuIcon>
								<MenuRowData>Sunset: </MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{sunset}</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="temperatura" src={WeatherIcons.termo1}></MenuIcon>
								<MenuRowData>Temperature:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>
									{data.current.temp} {symbolUnit}
								</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="Feels like temperature" src={WeatherIcons.termo2}></MenuIcon>
								<MenuRowData>Feels like temp:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>
									{data.current.feels_like} {symbolUnit}
								</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="% clouds" src={WeatherIcons.cloud} />
								<MenuRowData>Clouds:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{data.current.clouds}%</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="Wind speed" src={WeatherIcons.wind} />
								<MenuRowData>Winds speed:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{data.current.wind_speed} m/s</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="Humidity" src={WeatherIcons.humidity} />
								<MenuRowData>Humidity:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{data.current.humidity}%</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="Wind direction" src={WeatherIcons.winddir} />
								<MenuRowData>Wind direction:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{props.wd}</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="UV Index" src={WeatherIcons.uvi} />
								<MenuRowData>UV Index:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>{data.current.uvi}</MenuRowData>
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
										<span>Very high!</span>
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
								<MenuIcon title="Visibility" src={WeatherIcons.eye} />
								<MenuRowData>Visibility:</MenuRowData>
							</MenuRowDesc>
							<MenuRowDesc mobile>
								<MenuRowData>
									{Math.round(data.current.visibility / 10) / 100}
									{data.current.visibility === 10000 && "+"} km
								</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
						{data.current.snow && (
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="wysokość opadów śniegu, ostatnia godzina" src={WeatherIcons.snow} />
									<MenuRowData>Snow (1h):</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc mobile>
									<MenuRowData>{data.current.snow["1h"]}mm</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
						)}
						{data.current.rain && (
							<MenuRow>
								<MenuRowDesc>
									<MenuIcon title="wysokość opadów deszczu, ostatnia godzina" src={WeatherIcons.rain} />
									<MenuRowData>Rain (1h):</MenuRowData>
								</MenuRowDesc>
								<MenuRowDesc mobile>
									<MenuRowData>{data.current.rain["1h"]} mm</MenuRowData>
								</MenuRowDesc>
							</MenuRow>
						)}
					</ModalContainer>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter />
		</Modal>
	);
};
export default MobileWidget;
