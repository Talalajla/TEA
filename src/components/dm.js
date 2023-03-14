import { useEffect, useState } from "react";

export const useDarkMode = () => {
	const [theme, setTheme] = useState("light");
	const [mountedComponent, setMountedComponent] = useState(false);

	const setMode = (mode) => {
		window.localStorage.setItem("TED_theme", mode);
		setTheme(mode);
	};

	const toggleTheme = () => {
		theme === "light" ? setMode("dark") : setMode("light");
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("TED_theme");
		localTheme && setTheme(localTheme);
		setMountedComponent(true);
	}, []);

	return [theme, toggleTheme, mountedComponent];
};
