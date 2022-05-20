import styled from "styled-components";
import { css } from "styled-components";

export const Menu = styled.div`
	position: absolute;
	left: 30px;
	top: 30px;
	z-index: 2;
	font-size: 25px;
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.white};
	z-index: 20;

	svg {
		cursor: pointer;
		color: #fff;
	}
`;

export const Wrapper = styled.div`
	background: ${({ theme }) => theme.background};
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const MainBackground = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	overflow: hidden;
	background: #000;
`;

export const Content = styled.div`
	z-index: 2;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	color: ${({ theme }) => theme.text};
	@media (max-width: 800px) {
		width: 100%;
		padding: 0 30px;
	}
`;

export const WeatherIconCircle = styled.div`
	border-radius: 50%;
	width: 45px;
	height: 45px;
	background: rgba(255, 255, 255, 0.05);
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 10px 0 30px;
	cursor: pointer;
	position: relative;
	transition: background 0.1s;

	:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	${({ isopen }) =>
		isopen &&
		css`
			background: rgba(255, 255, 255, 0.2);
		`}

	img {
		max-width: 40px;
	}
`;

export const MenuMoreWeatherInfo = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	background: #fff;
	padding: ${({ nopadd }) => (nopadd ? "0" : "15px")};
	min-width: 250px;
	max-width: 300px;
	border-radius: 15px;
	transform: translateY(130%);
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	display: flex;
	flex-direction: column;
	gap: 5px;
	cursor: default;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.1s, transform 0.1s, visibility 0.1s;

	${({ show }) =>
		show &&
		css`
			visibility: visible;
			opacity: 1;
			transform: translateY(100%);
		`}

	${({ alerts }) =>
		alerts &&
		css`
			min-width: 400px;
			max-width: 400px;
		`}
`;

export const MenuRow = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: ${({ space }) => (space ? "space-between" : null)};
	font-size: ${({ space }) => (space ? "18px" : "15px")};
	padding: ${({ padd }) => (padd ? "15px" : "0")};

	svg {
		color: ${({ theme }) => theme.text};
		font-size: 20px;
	}

	${({ hov }) =>
		hov &&
		css`
			:hover {
				background: rgba(0, 0, 0, 0.1);
				cursor: pointer;
			}
		`}
	${({ title, theme }) =>
		title &
		css`
			font-size: 20px;
			border-bottom: 1px solid ${theme.background2};
		`}

	div {
		white-space: nowrap;
	}
`;

export const MenuTitle = styled.div`
	font-size: 18px;
	border-bottom: 1px solid ${({ theme }) => theme.background2};
	padding: 15px 20px;
`;

export const MenuHr = styled.hr`
	width: 100%;
	height: 1px;
	margin: 10px 0;
	background: ${({ theme }) => theme.background2};
	border: none;
	display: flex;
	align-items: center;
`;

export const MenuRowDesc = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	flex: 1;
	max-width: 50%;
	justify-content: ${({ flexend }) => (flexend ? "flex-end" : "flex-start")};

	${({ col }) =>
		col &&
		css`
			svg {
				color: ${() => {
					if (col === "green") return "#34eb52";
					else if (col === "red") return "#eb3446";
				}};
				cursor: default;
			}
		`}

	svg {
		font-size: 23px;
	}
`;
export const MenuRowData = styled.div``;

export const MenuIcon = styled.img`
	width: 23px;
	height: 23px;
`;

export const WeatherMenuInfo = styled.div`
	font-size: 20px;
	padding: 0 5px;
`;

// ? Content

export const Greetings = styled.div`
	padding: 10px 0;
	color: #eee;
	display: flex;
	justify-content: space-between;
	font-size: 20px;

	code {
		padding: 2px;
	}

	@media (max-width: 800px) {
		font-size: 20px;
	}
`;

export const SearchForm = styled.form``;
export const SearchBox = styled.label`
	position: relative;
	width: 650px;
	height: 100%;
	display: flex;
	@media (max-width: 800px) {
		width: 100%;
	}
`;
export const UrlInput = styled.input`
	height: 100%;
	padding: 12.5px 15px;
	border-radius: 25px 0 0 25px;
	border: none;
	flex: 1;
	outline: none;
	font-size: 16px;
	color: ${({ theme }) => theme.text};
	background: ${({ theme }) => theme.background};
`;
export const FunctionBox = styled.div`
	height: 44px;
	display: flex;
	align-items: center;
	font-size: 20px;
	color: ${({ theme }) => theme.text};
	background: ${({ theme }) => theme.background};
	border-radius: ${({ corner }) => (corner ? "0 25px 25px 0" : null)};
	padding: ${({ corner }) => (corner ? "0 15px" : "0 0 0 15px")};
	cursor: pointer;

	${({ engine }) =>
		engine &&
		css`
			color: ${() => {
				if (engine === "bing") return "#0C8484";
				else if (engine === "yahoo") return "#410093";
				else if (engine === "duckduckgo") return "#F05435";
			}};
		`}

	input[type="submit"] {
		display: none;
	}
	svg {
		cursor: pointer;
	}
`;

export const CardsWrapper = styled.div`
	padding-top: 30px;
	display: flex;
	gap: 5px;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 650px;
`;

export const Card = styled.div`
	position: relative;
	width: 100px;
	min-height: 110px;
	color: #dcdfe3;
	z-index: 2;

	${({ adder }) =>
		adder &&
		css`
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 5px;
			cursor: pointer;
			text-shadow: 0 0 3px black;
		`}

	:hover > div {
		opacity: 1;
	}
	:hover a > div {
		opacity: 1;
	}
`;

export const CardLink = styled.a`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	gap: 8px;
	color: #dcdfe3;
	text-shadow: 0 0 3px black;
	margin: 20px 10px 0;
	height: calc(100% - 20px);
`;

export const CardFavicon = styled.div`
	background: #fff;
	box-shadow: 0 0 1px #111;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.15s;
	opacity: 0.8;

	+ div {
		font-size: 13px;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		text-align: center;
	}

	svg {
		font-size: 20px;
	}

	${({ black }) =>
		black &&
		css`
			/* filter: drop-shadow(0 0 2px black); */
			color: #121212;
			margin-top: 20px;
		`}
`;

export const CardImg = styled.img`
	width: 32px;
	border-radius: 50%;
`;

export const CardEdit = styled.div`
	position: absolute;
	top: 0;
	right: 5px;
	opacity: 0;
	transition: opacity 0.2s;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		font-size: 20px;
		color: #fff;
	}
`;

export const CardMenu = styled.dialog`
	margin: 0;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 3;
	border: 1px solid ${({ theme }) => theme.background2};
	border-radius: 5px;
	padding: 2px;
	min-width: 150px;
`;

export const MenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3px;

	button {
		border: none;
		background: transparent;
		width: 100%;
		padding: 10px 5px;
		font-size: 14px;
		letter-spacing: 0.3px;
		display: flex;
		gap: 5px;
		cursor: pointer;

		:hover {
			background: rgba(0, 0, 0, 0.1);
		}

		svg {
			font-size: 15px;
		}
	}
`;

export const CityList = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 3px;
	list-style: none;
`;

export const CityListItem = styled.li`
	color: ${({ theme }) => theme.text};
`;

export const CityItemLabel = styled.label`
	cursor: pointer;
`;
export const CityHiddenRadio = styled.input.attrs({ type: "radio" })`
	display: none;

	:checked + div {
		background: ${({ theme }) => theme.blue2};
		color: ${({ theme }) => theme.white};
	}
`;
export const CityItemStyle = styled.div`
	display: flex;
	padding: 5px 10px;
	background: ${({ theme }) => theme.background};
	border-radius: 10px;
	user-select: none;
	:hover {
		background: ${({ theme }) => theme.background2};
	}
`;
export const CityItemInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	font-size: 12px;

	> span:first-of-type {
		font-size: 15px;
	}
	> div {
		font-size: 12px;
	}
	:last-of-type {
		max-width: 125px;
		align-items: flex-end;
		span {
			font-size: 12px;
		}
		div {
			align-items: flex-end;
		}
	}
`;
export const SearchCitiesBtn = styled.div`
	color: ${({ theme }) => theme.white};
	background: ${({ theme }) => theme.blue2};
	border-radius: 0 10px 10px 0;
	cursor: pointer;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 0;
`;

export const AlertBox = styled.div`
	padding-left: 10px;
	font-size: 20px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		color: red;
	}
`;
export const AlertRow = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 12px;
	padding: 15px 20px;
`;
export const AlertTop = styled.div`
	display: grid;
	grid-template-columns: 1fr 65px;
	padding-bottom: 10px;
`;
export const AlertTitle = styled.div`
	font-weight: 500;
`;
export const AlertDesc = styled.div`
	text-align: justify;
	letter-spacing: 0.3px;
`;
export const AlertTimes = styled.div``;
export const AlertSource = styled.div`
	font-size: 10px;
	padding-top: 5px;
`;
