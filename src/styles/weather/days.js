import styled from "styled-components";

export const DaysContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;

    label {
        flex: 1;
    }
`;

export const DayItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
    padding: 30px;
    background-color: ${({theme}) => theme.weatherCards};
    color: ${({theme}) => theme.weatherCardsTxt};
    border-radius: 10px;
    align-items: center;
    cursor: pointer;
    transition: background .2s;

    :hover {
        background: ${({theme}) => theme.weatherCardsHov};
    }
`;

export const DayRadio = styled.input.attrs({type: 'radio'})`
    display: none;
    :checked + div {
        background: ${({theme}) => theme.background};
    }
`;

export const WeatherBox = styled.div`
    display: flex;
    flex-direction: column;
    color: #ffffff;
    width: 100%;
    align-items: center;
    font-size: 20px;
    padding-bottom: 50px;
`;

export const WeatherRow = styled.div`
    display: flex;
    gap: 10px;
    font-size: 1em;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;    
`;

export const WeatherCurrentDescription = styled(WeatherRow)`
    padding-bottom: 20px;
    font-size: 1.15em;
`;

export const WeatherRowOthers = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: .75em;
    
    div {
        padding: 5px 15px;
    }
`;

export const WeatherCurrentTemp = styled.p`
    font-size: 3em;
    font-weight: 200;
    margin: 0;
`;