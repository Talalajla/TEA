import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LapseImages from "../pages/home/lapse/imgs";
import Photos from "../pages/home/photos/photos";
import { MainBackground, Wrapper } from "../styles/home/main";

const CurrentImage = styled.div`
	width: 100%;
	height: 100%;
	background-position: center bottom;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: ${({ nr, source }) => {
		const res = Object.entries(source);
		let src;
		console.log(nr, res[0]);
		res.map((item) => (+item[0] === nr ? (src = item[1]) : null));
		return `url(${src})`;
	}};
	transition: opacity 0.5s;
	opacity: .5;
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
			console.log(props.bgType);
			if (hour !== hourNow && (props.bgType === 'lapse' || localStorage.getItem('TED_backgroundType') === 'lapse')) {
				setTimeout(() => (imgRef.current.style.opacity = 0), 0);
				setTimeout(() => setHour(hourNow), 450);
				setTimeout(() => (imgRef.current.style.opacity = .5), 500);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [hour]);

	return (
		<>
			<Wrapper>{props.children}</Wrapper>
			<MainBackground>
				{
					props.bgType === "lapse" &&
					<CurrentImage ref={imgRef} source={LapseImages} nr={hour} />
				}
				{
					props.bgType === "photo" &&
					<CurrentImage ref={imgRef} source={Photos} nr={+props.bgNumber} />
				}
			</MainBackground>
		</>
	);
};

export default Background;
