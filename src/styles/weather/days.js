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

    :hover {
        background-color: ${({theme}) => theme.weatherCardsHov};
    }
`;

export const DayRadio = styled.input.attrs({type: 'radio'})`
    display: none;
    :checked + div {
        background: ${({theme}) => theme.background};
    }
`;