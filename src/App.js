import { ThemeProvider } from "styled-components";
import React from "react";
import { darkTheme, lightTheme } from "./styles/theme/theme";
import GlobalStyle from "./GlobalStyles";
import Home from "./pages/home/main";
import Weather from "./pages/weather/main";
import { useDarkMode } from "./components/dm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toggle from "./components/dmToggle";

const App = () => {
	const [theme, toggleTheme, mountedComponent] = useDarkMode();
	const themeMode = theme === "light" ? lightTheme : darkTheme;

	if (!mountedComponent) return <div />;

	return (
		<ThemeProvider theme={themeMode}>
			<GlobalStyle />
			<Toggle theme={theme} toggleTheme={toggleTheme} onClick={toggleTheme} dark={theme === "light"} />
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Home toggleDM={toggleTheme} />} />
					<Route path="/weather" element={<Weather toggleDM={toggleTheme} />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
