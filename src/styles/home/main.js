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
	width: 100%;
	height: 100%;
	z-index: 1;
	overflow: hidden;
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

	div {
		white-space: nowrap;
	}
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
	justify-content: center;

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
		font-size: 20px;
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
	font-size: 30px;
	padding: 10px 0;
	color: #eee;

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

export const Card = styled.a`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #dcdfe3;
	text-shadow: 0 0 2px black;
	width: 100px;
	min-height: 100px;
	gap: 5px;

	:hover > div:first-of-type {
		background: #fff;
	}
`;

export const CardFavicon = styled.div`
	background: #efefef66;
	box-shadow: 0 0 1px #111;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.15s;
	cursor: pointer;
	${({ black }) =>
		black &&
		css`
			/* filter: drop-shadow(0 0 2px black); */
			color: #121212;
		`}
`;

export const CardImg = styled.img`
	width: 36px;
	border-radius: 50%;
`;
