import styled from "styled-components";

export const WeatherContent = styled.div`
	z-index: 2;
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-content: center;
	color: ${({ theme }) => theme.text};
	margin-bottom: 150px;
	margin-top: 30px;

	@media (max-width: 950px) {
		width: 100%;
		padding: 0 30px;
		margin-top: 30px;
	}

	@media (max-width: 500px) {
		margin-top: 0;
	}
`;

export const WeatherBox = styled.div`
	padding: 50px;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	font-size: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;