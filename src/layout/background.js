import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Images from "../pages/home/lapse/imgs";
import { MainBackground, Wrapper } from "../styles/home/main";

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

const Background = (props) => {
	const [hour, setHour] = useState(null);

	useEffect(() => {
		const figureTimeThings = () => {
			console.log("test");
			const hourNow = new Date().getHours();
			if (hour !== hourNow) {
				setHour(hourNow);
			}
		};

		figureTimeThings();
		setInterval(() => figureTimeThings(), 1000);
		return () => clearInterval(figureTimeThings);
	}, [hour]);

	return (
		<>
			<Wrapper>{props.children}</Wrapper>
			<MainBackground>
				<CurrentImage nr={hour} />
			</MainBackground>
		</>
	);
};

export default Background;
