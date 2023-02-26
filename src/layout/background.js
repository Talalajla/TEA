import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Images from "../pages/home/lapse/imgs";
import { MainBackground, Wrapper } from "../styles/home/main";

const CurrentImage = styled.div`
	width: 100%;
	height: 100%;
	background-position: center bottom;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: ${({ nr }) => {
		const res = Object.entries(Images);
		let src;
		res.map((item) => (+item[0] === nr ? (src = item[1]) : null));
		return `url(${src})`;
	}};
	transition: opacity 0.5s;
`;

const Background = (props) => {
	const [hour, setHour] = useState(null);
	const imgRef = useRef();

	useEffect(() => {
		if (!hour) return;
		const hourNow = new Date().getHours();
		setHour(hourNow);
	}, [hour]);

	useEffect(() => {
		const interval = setInterval(async () => {
			const hourNow = new Date().getHours();
			if (hour !== hourNow) {
				setTimeout(() => (imgRef.current.style.opacity = 0), 0);
				setTimeout(() => setHour(hourNow), 450);
				setTimeout(() => (imgRef.current.style.opacity = 1), 500);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [hour]);

	return (
		<>
			<Wrapper>{props.children}</Wrapper>
			<MainBackground>
				<CurrentImage ref={imgRef} nr={hour} />
			</MainBackground>
		</>
	);
};

export default Background;
