import styled from "styled-components";

export const WeatherSearchBox = styled.form`
    width: 100%;
    margin-bottom: 30px;
    position: relative;
`;
export const WeatherSearchLabel = styled.label`
    position: relative;
    display: block; 
    height: 100%;
    border: ${({active}) => active ? '1px solid #000' : ''};
    border-bottom-width: ${({active}) => active ? '0' : '1'};
`;
export const WeatherSearch = styled.input.attrs({type: 'search'})`
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    padding: 15px 25px;
    font-size: 22px;
    border: none;
    width: 100%;
    border-radius: ${({active}) => active ? '10px 10px 0 0' : '10px'};
    outline: none;
`;

export const WeatherSearchBtn = styled.input.attrs({type: 'submit'})`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background: ${({theme}) => theme.background2};
    color: ${({theme}) => theme.text};
    border-radius: ${({active}) => active ? '0 10px 0 0' : '0 10px 10px 0'};
    cursor: pointer;
    border: none;
    font-size: 16px;

    :hover {
        background: ${({theme}) => theme.btnShadow};
    }
`;
export const WeatherCitiesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 3px;
    background: ${({theme}) => theme.weatherListBg};
    position: absolute;
    margin: 0;
    padding: 10px 0;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    width: 100%;
    border-radius: 0 0 10px 10px;
    border-top: 1px solid #3d3d3d;
    border: ${({active}) => active ? '1px solid #000' : ''};
	z-index: 10;
`;
export const WeatherCitiesItem = styled.li`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 25px;
    font-size: 16px;

    :hover{ 
        background: ${({theme}) => theme.settsText};
    }


    strong {
        font-weight: 500;
    }
    svg {
        margin-left: auto;
        font-size: 24px;
        color: ${({theme}) => theme.text2};
    }

`;

export const WeatherCitiesItemData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;
