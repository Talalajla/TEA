import React, { useRef } from "react";
// More Menu Icons
import sunriseIco from "../../../files/home/sunrise.png";
import sunsetIco from "../../../files/home/sunset.png";
import termo1 from "../../../files/home/termo1.png";
import termo2 from "../../../files/home/termo2.png";
import rain from "../../../files/home/water.png";
import cloud from "../../../files/home/cloud.png";
import snow from "../../../files/home/snowflake.png";
import humidity from "../../../files/home/humidity.png";
import wind from "../../../files/home/wind.png";
import winddir from "../../../files/home/winddir.png";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { MenuHr, MenuIcon, MenuMoreWeatherInfo, MenuRow, MenuRowData, MenuRowDesc, WeatherIconCircle } from "../../../styles/home/main";
import { useClickAway } from "react-use";

export default function WeatherWidget(props) {
	const menuRef = useRef("");

	const data = props.data;

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
					<MenuRowData>{data.name}</MenuRowData>
					<MenuRowData>{data.sys.country}</MenuRowData>
				</MenuRow>
				<MenuRow>{data.weather[0].description}</MenuRow>
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
							{data.main.temp} {props.unit}
						</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc>
						<MenuIcon title="temperatura odczuwalna" src={termo2}></MenuIcon>
						<MenuRowData>
							{data.main.feels_like} {props.unit}
						</MenuRowData>
					</MenuRowDesc>
				</MenuRow>
				<MenuRow>
					<MenuRowDesc col="green">
						<MdKeyboardArrowUp title="temperatura minimalna" />
						<MenuRowData>
							{data.main.temp_min} {props.unit}
						</MenuRowData>
					</MenuRowDesc>
					<MenuRowDesc col="red">
						<MdKeyboardArrowDown title="temperatura maksymalna" />
						<MenuRowData>
							{data.main.temp_max} {props.unit}
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
						<MenuRowData>{props.windDir}</MenuRowData>
					</MenuRowDesc>
				</MenuRow>
				<MenuHr />
				<MenuRow>
					<MenuRowDesc>Dane z godz.</MenuRowDesc>
					<MenuRowDesc flexend>
						{new Date(data.dt * 1000).getHours() < 10 ? "0" : ""}
						{new Date(data.dt * 1000).getHours()}:{new Date(data.dt * 1000).getMinutes() < 10 ? "0" : ""}
						{new Date(data.dt * 1000).getMinutes()}
					</MenuRowDesc>
				</MenuRow>
			</MenuMoreWeatherInfo>
		</WeatherIconCircle>
	);
}
