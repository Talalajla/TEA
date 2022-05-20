import React, { useRef } from "react";
// More Menu Icons
import cloud from "../../../files/home/cloud.png";
import humidity from "../../../files/home/humidity.png";
import rain from "../../../files/home/water.png";
import sunriseIco from "../../../files/home/sunrise.png";
import sunsetIco from "../../../files/home/sunset.png";
import snow from "../../../files/home/snowflake.png";
import termo1 from "../../../files/home/termo1.png";
import termo2 from "../../../files/home/termo2.png";
import uvi from "../../../files/home/uv.png";
import wind from "../../../files/home/wind.png";
import winddir from "../../../files/home/winddir.png";
import { MenuHr, MenuIcon, MenuMoreWeatherInfo, MenuRow, MenuRowData, MenuRowDesc, WeatherIconCircle } from "../../../styles/home/main";
import { useClickAway } from "react-use";

export default function WeatherWidget(props) {
	const menuRef = useRef("");

	const data = props.data;
	let symbolUnit;
	if (props.unit === "metric") symbolUnit = "°C";
	else if (props.unit === "imperial") symbolUnit = "°F";
	else if (props.unit === "default") symbolUnit = "°K";

	useClickAway(
		menuRef,
		() => {
			props.closeMenu();
		},
		["mouseup"]
	);

	return (
		<WeatherIconCircle isopen={props.menu} ref={menuRef}>
			<img src={props.icon} alt="weather icon" onClick={() => props.toggleMenu()} />
			<MenuMoreWeatherInfo show={props.menu}>
				<MenuRow space>
					<MenuRowData>{props.cityname}</MenuRowData>
					<MenuRowData>{props.country}</MenuRowData>
				</MenuRow>
				<MenuRow>{data.current.weather[0].description}</MenuRow>
				<MenuHr />
				<MenuRow>Wschód i zachód słońca</MenuRow>
				<MenuRow>
					<MenuRowDesc>
						<MenuIcon title="wschód słońca" src={sunriseIco}></MenuIcon>
						<MenuRowData>{props.sr}</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc>
						<MenuIcon title="zachód słońca" src={sunsetIco}></MenuIcon>
						<MenuRowData>{props.ss}</MenuRowData>
					</MenuRowDesc>
				</MenuRow>
				<MenuHr />
				<MenuRow>Temperatura</MenuRow>
				<MenuRow>
					<MenuRowDesc>
						<MenuIcon title="temperatura" src={termo1}></MenuIcon>
						<MenuRowData>
							{data.current.temp} {symbolUnit}
						</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc>
						<MenuIcon title="temperatura odczuwalna" src={termo2}></MenuIcon>
						<MenuRowData>
							{data.current.feels_like} {symbolUnit}
						</MenuRowData>
					</MenuRowDesc>
				</MenuRow>

				{data.current.snow && (
					<>
						<MenuHr />
						<MenuRow>Opady śniegu</MenuRow>
						<MenuRow>
							<MenuRowDesc>
								<MenuIcon title="wysokość opadów śniegu, ostatnia godzina" src={snow} />
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
								<MenuIcon title="wysokość opadów deszczu, ostatnia godzina" src={rain} />
								<MenuRowData>{data.current.rain["1h"]} mm</MenuRowData>
							</MenuRowDesc>
						</MenuRow>
					</>
				)}
				<MenuHr />
				<MenuRow>Dodatkowe</MenuRow>

				<MenuRow>
					<MenuRowDesc>
						<MenuIcon title="procent zachmurzenia" src={cloud} />
						<MenuRowData>{data.current.clouds}%</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc>
						<MenuIcon title="prędkość wiatru" src={wind} />
						<MenuRowData>{data.current.wind_speed} m/s</MenuRowData>
					</MenuRowDesc>
				</MenuRow>
				<MenuRow>
					<MenuRowDesc>
						<MenuIcon title="wilgotność powietrza" src={humidity} />
						<MenuRowData>{data.current.humidity}%</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc>
						<MenuIcon title="kierunek wiatru" src={winddir} />
						<MenuRowData>{props.windDir}</MenuRowData>
					</MenuRowDesc>
				</MenuRow>
				<MenuRow>
					<MenuRowDesc>
						<MenuIcon title="uv index" src={uvi} />
						<MenuRowData>{data.current.uvi}</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc></MenuRowDesc>
				</MenuRow>
				<MenuRow>
					<MenuRowDesc>
						<MenuIcon title="visibility" src={uvi} />
						<MenuRowData>{data.current.visibility}</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc></MenuRowDesc>
				</MenuRow>
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
			</MenuMoreWeatherInfo>
		</WeatherIconCircle>
	);
}
