export const UnitFromText = (unit) => {
    if (unit === "metric") return "°C";
	else if (unit === "imperial") return "°F";
	else if (unit === "default") return "°K";
}