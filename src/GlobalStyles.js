import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    html {
        height: 100%;
        box-sizing: border-box;

    }

    *,*::before,*::after {
        box-sizing: inherit;
        /* border: 1px solid red; */
    }

    body {
        margin: 0;
        height: 100%;
        font-family: "Montserrat", sans-serif;
    }

    #root {
        height: 100%;
    }

    a {
        text-decoration: none;
        color: #000;
    }
`;

export default GlobalStyle;
