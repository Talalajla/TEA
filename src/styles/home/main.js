import styled from "styled-components";
import { css } from "styled-components";

export const MenuContainer = styled.div`
	padding: 30px 30px 0 0;
	margin-left: 30px;
	z-index: 2;
	font-size: 25px;
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.white};
	z-index: 20;
	position: relative;

	svg {
		cursor: pointer;
		color: #fff;
	}

	@media (max-width: 500px) {
		> div:first-of-type {
			width: 45px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
`;

export const Wrapper = styled.div`
	background: transparent;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow-y: auto;
	overflow-x: hidden;
	z-index: 2;
`;

export const MainBackground = styled.div`
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1;
	overflow: hidden;
	background: #000;
	z-index: 1;
`;

export const Content = styled.div`
	z-index: 2;
	max-width: 1000px;
	/* min-height: calc(100vh - 255px); */
	margin: 0 auto;
	margin-top: 150px;
	display: flex;
	flex-direction: column;
	align-content: center;
	color: ${({ theme }) => theme.text};
	margin-bottom: 150px;

	@media (max-width: 800px) {
		width: 100%;
		padding: 0 30px;
		margin-top: 30px;
	}

	@media (max-width: 500px) {
		margin-top: 0;
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
	@media (max-width: 500px) {
		margin-left: 0;
		width: 35px;
		height: 35px;
		margin-right: 3px;
		img {
			max-width: 35px;
		}
		display: none;
	}
	${({ mobile }) =>
		mobile &&
		css`
			display: none;

			@media (max-width: 500px) {
				display: flex;
			}
		`}
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
	transform: translateY(110%);
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	display: flex;
	flex-direction: column;
	gap: 5px;
	cursor: default;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.1s, transform 0.1s, visibility 0.1s;

	&.paddItems >* {
		padding: 15px;
		:hover {
			background: rgba(0, 0, 0, 0.1);
			cursor: pointer;
		}
	}

	a {
		color: ${({ theme }) => theme.text};
	}

	${({ show }) =>
		show &&
		css`
			visibility: visible;
			opacity: 1;
			transform: translateY(calc(100% + 10px));
		`}

	${({ alerts }) =>
		alerts &&
		css`
			min-width: 400px;
			max-width: 400px;
		`}
	@media (max-width: 500px) {
		width: calc(100vw - 60px);
		min-width: unset;
	}
	${({ widget }) =>
		widget &&
		css`
			@media (max-height: 600px) {
				max-width: unset;
			}
		`}
`;

export const MenuRow = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: ${({ space }) => (space ? "space-between" : null)};
	font-size: ${({ bigfz }) => (bigfz ? "18px" : "15px")};

	svg {
		color: ${({ theme }) => theme.text};
		font-size: 20px;
	}

	${({ title, theme }) =>
		title &
		css`
			font-size: 20px;
			border-bottom: 1px solid ${theme.background2};
		`}

	div {
		white-space: nowrap;
	}
	${({ mobile }) =>
		mobile &&
		css`
			display: none;
		`}
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
	max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "50%")};
	justify-content: ${({ flexend }) => (flexend ? "flex-end" : "flex-start")};
	position: relative;
	min-width: 100px;

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

	${({ mobile }) =>
		mobile &&
		css`
			min-width: unset;
			width: 85px;
			flex: unset;
		`}

	svg {
		font-size: 23px;
	}

	@media (max-width: 500px) {
		max-width: 100%;
	}
`;
export const MenuRowData = styled.div`
	${({ mobile }) =>
		mobile &&
		css`
			display: none;

			@media (max-height: 600px) {
				display: block;
			}
		`}
`;

export const MenuIcon = styled.img`
	width: 23px;
	height: 23px;
`;

export const WeatherMenuInfo = styled.div`
	font-size: 20px;
	padding: 0 5px;
	color: #fff;
	text-shadow: 0 0 1px rgb(0 0 0 );

	@media (max-width: 500px) {
		font-size: 14px;
	}
`;

export const UVHelp = styled.div`
	height: 19px;
	width: 19px;
	background: ${({ theme }) => theme.background2};
	color: ${({ theme }) => theme.text};
	border: 1px solid ${({ theme }) => theme.text};
	display: grid;
	place-items: center;
	border-radius: 50%;
	position: absolute;
	right: 0;
	font-size: 12px;
	:hover {
		cursor: help;
		+ div {
			display: flex;
		}
	}
	@media (max-width: 500px) {
		right: auto;
		left: 50px;
	}
`;

export const UVHelpBox = styled.div`
	position: absolute;
	padding: 20px;
	background: #fff;
	right: 0;
	bottom: 0;
	transform: translate(-10%, -10%);
	background: ${({ theme }) => theme.background};
	border: 1px solid ${({ theme }) => theme.background2};
	color: ${({ theme }) => theme.text};
	border-radius: 10px;
	display: ${({ show }) => (show ? "flex" : "none")};
	flex-direction: column;
	gap: 5px;
	max-width: 300px;
`;

export const UVColor = styled.div`
	padding: 5px 10px;
	text-align: center;
	color: #fff;
	text-shadow: 0 0 2px black;
	background: ${({ col }) => (col ? `${col}` : null)};
	width: 50px;
	white-space: nowrap;

	+ span {
		white-space: nowrap;
	}
`;

// ? Content

export const Greetings = styled.div`
	padding: 10px 0;
	color: #eee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	text-shadow: 0 0 1px #000;

	code {
		padding: 2px;
	}

	@media (max-width: 800px) {
		font-size: 16px;
	}
`;

export const SearchForm = styled.form`
	width: 100%;
`;
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
	transition: background 0.1s ease-in-out, text 0.1s;
	width: 100%;
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
	transition: background 0.1s ease-in-out, text 0.1s;

	${({ engine }) =>
		engine &&
		css`
			color: ${() => {
				if (engine === "bing") return "#0C8484";
				else if (engine === "yahoo") return "#410093";
				else if (engine === "duckduckgo") return "#F05435";
				else if (engine === "reddit") return "#f24102";
				else if (engine === "twitch") return "#9146ff";
				else if (engine === "youtube") return "#ff0000";
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
	transition: background-color .15s ease;
	border-radius: 10px;
	padding-bottom: 10px;

	${({ adder }) =>
		adder &&
		css`
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			gap: 5px;
			cursor: pointer;
			text-shadow: 0 0 3px black;
		`}

	:hover {
		background-color: rgb(0 0 0 / .35);
	}

	:hover > div {
		opacity: 1;
	}
	:hover a > div {
		opacity: 1;
	}

	@media (max-width: 600px) {
		width: 75px;
		min-height: 80px;
	}
`;

export const CardLink = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	gap: 8px;
	color: #dcdfe3;
	text-shadow: 0 0 5px black;
	margin: 20px 10px 0;
	height: calc(100% - 20px);
`;

export const CardFavicon = styled.div`
	background: ${({theme}) => theme.background};
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
		color: ${({theme}) => theme.text};
		
	}

	${({ black }) =>
		black &&
		css`
			/* filter: drop-shadow(0 0 2px black); */
			color: #121212;
			margin-top: 20px;
		`}
	@media (max-width: 600px) {
		width: 45px;
		height: 45px;
		svg {
			font-size: 15px;
		}
	}
`;

export const CardImg = styled.img`
	width: 32px;
	border-radius: 50%;
	@media (max-width: 600px) {
		width: 20px;
	}
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
	background: ${({theme}) => theme.background};
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
		color: ${({theme}) => theme.text};

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
	width: 100%;
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
