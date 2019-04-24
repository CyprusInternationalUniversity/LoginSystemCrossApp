import { Dimensions, Platform } from "react-native";

export const { width, height } = Dimensions.get("window");

export function viewPortWidth(percentage) {
	const value = (width * 100) / percentage;
	return Math.round(value);
}

export function viewPortHeight(percentage) {
	const value = (height * 100) / percentage;
	return Math.round(value);
}

export const isIphoneX = () =>
	// This has to be iOS duh
	Platform.OS === "ios" &&
	// Accounting for the height in either orientation
	(height === 812 || width === 812);
