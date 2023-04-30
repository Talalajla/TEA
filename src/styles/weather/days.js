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
    padding: 30px 10px;
    background-color: ${({theme}) => theme.weatherCards};
    color: ${({theme}) => theme.weatherCardsTxt};
    border-radius: 10px;
    align-items: center;
    cursor: pointer;
    transition: background .2s;
    min-width: 150px;

    img {
        filter: drop-shadow(0 0 1px #000);
    }

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
    text-shadow: 0 0 2px #000;
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

export const WeatherCurrentTemp = styled.div`
    font-size: 3.5em;
    font-weight: 200;
    margin: 0;
    display: flex;
    >span {
        font-size: .6em;
    }
    div {
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

export const WeatherCurrentTempVal = styled.span`
    font-size: ${({active}) => active ? '20px' : '15px'};
    padding: 2px 0;
    font-weight: ${({active}) => active ? 600 : 300};
    color: ${({active}) => active ? '#fff' : '#d9e0f2'};
    cursor: pointer;
`;

export const WeatherRecentDays = styled.div`
    display: flex;
    padding-bottom: 30px;
    text-align: center;
`;
export const WeatherRecentDay = styled.div`
    padding: 10px 15px;   
    background-color: ${({theme}) => theme.weatherCards};
    color: ${({theme}) => theme.weatherCardsTxt};
    flex: 1;
    max-width: 33.33%;
    border-radius: 7.5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    transition: background .2s;

    :not(:first-of-type) {
        margin-left: 5px;
    }

    :hover {
        background: ${({theme}) => theme.background};
    }
`;

export const DaysIntervalContainer = styled.div`
    background-color: ${({theme}) => theme.weatherCards};
    color: ${({theme}) => theme.weatherCardsTxt};
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    transition: background .2s;
    overflow-x: auto;
    max-width: 830px;

    h4 {
        margin: 0 0 20px;
        font-size: 18px;
    }

    img {
        filter: drop-shadow(0 0 1px #000);
    }

    :hover {
        background: ${({theme}) => theme.weatherCardsHov};
    }
`;

export const DaysIntervalInner = styled.div`
    display: flex;
`;

export const DaysIntervalCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 87.7px;

    div {
        font-weight: 500;
    }

    svg {
        font-size: 30px;
        color: ${({theme}) => theme.text};
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: none;
        @media (max-width: 1000px) {
            display: block;
        }
    }
`;