import styled from "styled-components";
import { css } from "styled-components";

export const ModalSection = styled.div`	
	transition: background-color .15s;
	${({ isRoot }) =>
		isRoot &&
		css`
			position: fixed;
			top: 0;
			width: 100vw;
			height: 100vh;
			z-index: 100;
			background-color: rgba(0, 0, 0, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
		`}
`;
export const ModalBox = styled.div`
	display: block;
	overflow: auto;
	${({ bgGrid }) => 
		bgGrid &&
		css`
			display: grid;
			grid-template-rows: 60px 1fr 60px;
			overflow: scroll;
		`}
	background: ${({ theme }) => theme.background};
	border: 1px solid ${({ theme }) => theme.background2};
	color: ${({ theme }) => theme.text};
	padding: 20px;
	border-radius: 10px;
	min-width: 400px;
	max-height: 95%;
	margin: auto;
	position: relative;
	@media (max-width: 500px) {
		min-width: unset;
		width: 95%;
	}
`;
export const ModalHeader = styled.div`
	text-align: center;
	font-size: 25px;
	padding: 15px 0;
`;
export const ModalBody = styled.div`
	display: flex;
	padding: 20px 0;
	${({bgOverflow}) => 
		bgOverflow && css`
			overflow: scroll;
			height: 100%;
		`};
`;
export const ModalFooter = styled.div`
	padding: 10px 0;
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	width: 100%;
`;

export const ModalButton = styled.div`
	border: 1px solid ${({ theme }) => theme.text};
	color: ${({ theme }) => theme.text};
	background: transparent;
	padding: 10px 25px;
	border-radius: 5px;
	cursor: pointer;
	transition: box-shadow 0.2s;

	${({ hov }) =>
		hov &&
		css`
			:hover {
				box-shadow: 0 0 0 5px ${({ theme }) => theme.btnShadow};
			}
		`}

	${({ final }) =>
		final &&
		css`
			background: ${({ theme }) => theme.blue1};
			border: 1px solid ${({ theme }) => theme.blue1};
			color: #fefefe;
			transition: background 0.2s;

			:hover {
				background: ${({ theme }) => theme.blue2};
			}
		`}
`;

export const ModalContainer = styled.div`
	width: 100%;
	height: ${({ fullh }) => (fullh ? "100%" : "auto")};

	${({ flex, mobileSwap }) =>
		flex &&
		css`
			display: flex;
			flex-direction: ${({ col }) => (col ? "column" : "row")};
			gap: ${({ gap }) => (gap ? `${gap}px` : null)};
			justify-content: ${({ jccenter }) => (jccenter ? "center" : "flex-start")};
			align-items: ${({ aicenter }) => (aicenter ? "center" : "flex-start")};
			${mobileSwap &&
			css`
				@media (max-height: 600px) {
					flex-direction: row;
					gap: 10px;
				}
			`}
		`};
	font-size: ${({ fz }) => (fz ? `${fz}px` : "16px")};
	@media (max-height: 600px) {
		display: ${({ notmobile }) => (notmobile ? "none" : null)};
	}
`;

export const ModalLabel = styled.label`
	cursor: ${({ cp }) => (cp ? "pointer" : "default")};

	:not(:first-of-type) {
		margin-top: 10px;
	}

	${({ type }) =>
		type &&
		css`
			svg:last-of-type {
				display: ${({ type }) => (type === "google" ? "none" : "")};
			}

			input:checked ~ svg {
				:first-of-type {
					display: ${({ type }) => (type === "google" ? "none" : "")};
				}
				:last-of-type {
					display: ${({ type }) => (type === "google" ? "block" : "")};
				}

				color: ${() => {
					if (type === "bing") return "#0C8484";
					else if (type === "yahoo") return "#410093";
					else if (type === "duckduckgo") return "#F05435";
					else if (type === "amazon") return "#ff9900";
					else if (type === "reddit") return "#f24102";
					else if (type === "twitch") return "#9146ff";
					else if (type === "youtube") return "#ff0000";
					else if (type === "wikipedia") return "#000000";
				}};
			}

			:hover {
				svg:first-of-type {
					display: ${({ type }) => (type === "google" ? "none" : "")};
				}
				svg:last-of-type {
					display: ${({ type }) => (type === "google" ? "block" : "")};
				}

				color: ${() => {
					if (type === "bing") return "#0C8484";
					else if (type === "yahoo") return "#410093";
					else if (type === "duckduckgo") return "#F05435";
					else if (type === "amazon") return "#ff9900";
					else if (type === "reddit") return "#f24102";
					else if (type === "twitch") return "#9146ff";
					else if (type === "youtube") return "#ff0000";
					else if (type === "wikipedia") return "#000000";
				}};
			}
		`}
`;
export const ModalInput = styled.input`
	background: ${({ theme }) => theme.background2};
	border: none;
	padding: 7.5px 12.5px;
	color: ${({ theme }) => theme.text2};
	font-size: 15px;
	letter-spacing: 0.7px;
	height: 100%;
	${({ flexfull }) =>
		flexfull &&
		css`
			flex: 1;
			border-radius: 10px 0 0 10px;

			:focus + div,
			:focus-visible + div {
				outline: 2px solid ${({ theme }) => theme.blue2};
			}
		`}
`;

export const ModalRow = styled.div`
	display: flex;
	padding: 5px 0;
	width: 100%;
`;

export const DefaultRadio = styled.input.attrs({ type: "radio" })`
	display: none;

	${({ temp }) =>
		temp &&
		css`
			:checked + div {
				background: ${({ theme }) => theme.blue2};
				color: #efefef;
			}
		`}
`;

export const ModalCardContainer = styled.div`
	width: 100%;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	gap: 5px;

	${({ footer }) =>
		footer &&
		css`
			flex-direction: row;
			justify-content: flex-end;
		`}
`;
export const CornerClose = styled.div`
	position: absolute;
	right: 15px;
	top: 10px;
	font-size: 30px;
	color: ${({ theme }) => theme.text};
`;
export const ModalBackgroundCards = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	max-width: calc(20px + 20px + 150px + 20px + 150px + 20px + 150px);
	padding: 0 20px;
	>figure {
		max-width: 150px;
		border-radius: 15px;
		position: relative;
		width: 150px;
		margin: 0;
		cursor: pointer;
		>img {
			border: 1px solid rgb(0 0 0 / .5);
			border-radius: 15px;
			width: 100%;
		}
		>figcaption {
			padding: 5px 0;
			text-align: center;
			text-transform: capitalize;
		}
	}
	@media (max-width: 768px) {
		max-width: calc(20px + 20px + 150px + 150px + 20px);
	}
	@media(max-width: 500px) {
		max-width: unset;
		justify-content: center;
		> figure {
			max-width: 100%;
			width: 100%;
			height: auto;
		}
	}
`;

export const ModalShortcut = styled.div`
	display: flex;
	align-items: center;
	span {
		padding: 0 5px;
	}
`;
export const ModalShortcutKey = styled.code`
	background: ${({theme}) => theme.blue2};
	border-radius: 5px; 
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	text-transform: uppercase;
	padding: 5px 10px;
`;
export const ModalShortcutResult = styled.span`
	color: ${({theme}) => theme.text};
	font-weight: 600;
	letter-spacing: .8px;
	margin-left: 5px;
`;
