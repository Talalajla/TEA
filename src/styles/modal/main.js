import styled from "styled-components";
import { css } from "styled-components";

export const ModalSection = styled.div`
	${({ isRoot }) =>
		isRoot &&
		css`
			position: fixed;
			top: 0;
			width: 100vw;
			height: 100vh;
			z-index: 100;
			background-color: rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: center;
			align-items: center;
		`}
`;
export const ModalBox = styled.div`
	display: block;
	background: ${({ theme }) => theme.background};
	border: 1px solid ${({ theme }) => theme.background2};
	color: ${({ theme }) => theme.text};
	padding: 20px;
	border-radius: 10px;
	min-width: 400px;
`;
export const ModalHeader = styled.div`
	text-align: center;
	font-size: 25px;
	padding: 15px 0;
`;
export const ModalBody = styled.div`
	display: flex;
	padding: 20px 0;
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
			background: #0373fc;
			border: 1px solid #0373fc;
			color: #fefefe;
			transition: background 0.2s;

			:hover {
				background: #308dff;
			}
		`}
`;

export const ModalContainer = styled.div`
	flex: 1;

	${({ flex }) =>
		flex &&
		css`
			display: flex;
			flex-direction: ${({ col }) => (col ? "column" : "row")};
		`}
`;

export const ModalLabel = styled.label`
	:not(:first-of-type) {
		margin-top: 10px;
	}
`;
export const ModalInput = styled.input`
	background: ${({ theme }) => theme.background2};
	border: none;
	padding: 7.5px 12.5px;
	color: ${({ theme }) => theme.text2};
	font-size: 15px;
	letter-spacing: 0.7px;
`;
