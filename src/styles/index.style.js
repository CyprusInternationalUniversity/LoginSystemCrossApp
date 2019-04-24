import { StyleSheet } from "react-native";

export const colors = {
	primary: "#e50000",
	primaryDark: "#36a7f0",
	black: "#1a1917",
	gray: "#575757",
	background1: "#B721FF",
	background2: "#21D4FD",
};

export const separator = {
	width: "100%",
	height: 1,
	backgroundColor: "#bfbfbf",
};
// center text
export const textAlignCenter = {
	textAlign: "center",
};
// Margins
export const mt5 = {
	marginTop: 5,
};
export const mt10 = {
	marginTop: 10,
};
export const mb10 = {
	marginBottom: 10,
};
export const mr10 = {
	marginRight: 10,
};
export const mt20 = {
	marginTop: 20,
};
export const mb5 = {
	marginBottom: 5,
};
export const mb20 = {
	marginBottom: 20,
};
export const mb30 = {
	marginBottom: 30,
};
export const m5 = {
	margin: 5,
};
export const m10 = {
	margin: 10,
};
export const m15 = {
	margin: 15,
};
export const m20 = {
	margin: 20,
};
// Paddings
export const pt10 = {
	paddingTop: 10,
};
export const pt20 = {
	paddingTop: 20,
};
export const p5 = {
	padding: 5,
};
export const p10 = {
	padding: 10,
};
export const p15 = {
	padding: 15,
};
export const p20 = {
	padding: 20,
};

export const h3 = {
	fontSize: 28,
};

export const smallText = {
	fontSize: 10,
};

export const verySmallText = {
	fontSize: 9,
};

export const br5 = {
	borderRadius: 5,
};

export const GenericBtn = {
	width: 300,
	height: 42,
	borderColor: "#2b32b2",
	borderWidth: 1,
	borderRadius: 5,
};
export const noBorder = {
	borderWidth: 0,
};

export const fdirectionRow = {
	flexDirection: "row",
};

export const fdirectionColumn = {
	flexDirection: "column",
};

export const alignCenter = {
	alignItems: "center",
};

export const justifyCenter = {
	justifyContent: "center",
};

export const GenericContainer = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	// backgroundColor: "rgba(100,200,200,0.2)"
};

export const flex1 = {
	flex: 1,
};

export const width100 = {
	width: "100%",
};

export const backgroundFull = {
	flex: 1,
	width: "100%",
	height: "100%",
	// remove width and height to override fixed static size
	// width: null,
	// height: null
};

export const bold = {
	fontWeight: "bold",
};

export const wClr = {
	color: "#FFF",
};

export default StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.black,
	},
	container: {
		flex: 1,
		backgroundColor: colors.background1,
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
	scrollview: {
		flex: 1,
	},
	exampleContainer: {
		paddingVertical: 30,
	},
	exampleContainerDark: {
		backgroundColor: colors.black,
	},
	exampleContainerLight: {
		backgroundColor: "white",
	},
	title: {
		paddingHorizontal: 30,
		backgroundColor: "transparent",
		color: "rgba(255, 255, 255, 0.9)",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	titleDark: {
		color: colors.black,
	},
	subtitle: {
		marginTop: 5,
		paddingHorizontal: 30,
		backgroundColor: "transparent",
		color: "rgba(255, 255, 255, 0.75)",
		fontSize: 13,
		fontStyle: "italic",
		textAlign: "center",
	},
	slider: {
		marginTop: 15,
		overflow: "visible", // for custom animations
	},
	sliderContentContainer: {
		paddingVertical: 10, // for custom animation
	},
	paginationContainer: {
		paddingVertical: 8,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 8,
	},
});
