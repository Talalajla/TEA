import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
import { css } from "styled-components";
const Button = styled.div`
	color: #fff;
	/* padding: 5px 10px; */
	position: absolute;
	right: 30px;
	top: 30px;
	z-index: 20;
	height: 45px;
	display: flex;
	align-items: center;

	> svg {
		transition: transform 0.5s;

		> mask circle {
			transition: cx 0.5s cy 0.5s;
		}
		> circle {
			transition: r 0.5s;
		}
		> g {
			transition: opacity 0.5s;
		}
	}

	${({ setMoon }) =>
		!setMoon &&
		css`
			> svg {
				transform: rotate(40deg) !important;

				> mask circle {
					cx: 12px !important;
					cy: 4px !important;
				}
				> circle {
					r: 9px !important;
				}
				> g {
					opacity: 0 !important;
				}
			}
		`}

	@media (max-width: 500px) {
		display: none;
	}
`;

const Toggle = ({ theme, toggleTheme, dark }) => {
	return (
		<Button onClick={toggleTheme} setMoon={dark}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{ transform: "rotate(90deg)", cursor: "pointer" }}
			>
				<mask id="mask">
					<rect x="0" y="0" width="100%" height="100%" fill="#ddd"></rect>
					<circle style={{ cx: "30px", cy: "0px" }} cx="12" cy="4" r="9" fill="black"></circle>
				</mask>
				<circle style={{ r: "5px" }} fill="currentColor" cx="12" cy="12" r="9" mask="url(#mask)"></circle>
				<g style={{ opacity: "1" }} fill="currentColor">
					<line x1="12" y1="1" x2="12" y2="3"></line>
					<line x1="12" y1="21" x2="12" y2="23"></line>
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
					<line x1="1" y1="12" x2="3" y2="12"></line>
					<line x1="21" y1="12" x2="23" y2="12"></line>
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
				</g>
			</svg>
		</Button>
	);
};

Toggle.propTypes = {
	theme: string.isRequired,
	toggleTheme: func.isRequired,
};

export default Toggle;
