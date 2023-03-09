import styled from "styled-components";

export const ChartContainer = styled.div`
    display: block;
    padding: 10px;
    background-color: ${({theme}) => theme.weatherCards};
    color: ${({theme}) => theme.weatherCardsTxt};
    border-radius: 10px;

    :hover {
        background-color: ${({theme}) => theme.background};
    }
`;