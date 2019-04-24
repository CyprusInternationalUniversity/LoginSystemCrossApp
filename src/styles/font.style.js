import { Platform } from "react-native";
// Avenir family
export const AvenirLTStdBlack = {
	fontFamily: "AvenirLTStd-Black"
};
export const AvenirLTStdBook = {
	fontFamily: "AvenirLTStd-Book"
};

export const AvenirLTStdHeavy = {
	fontFamily: "AvenirLTStd-Heavy"
};

// Effra family
export const EffraHeavy = {
	// ...Platform.select({
	// 	ios: {
	// 		fontFamily: "Effra Heavy"
	// 	},
	// 	android: {
	// 		fontFamily: "Effra-Heavy"
	// 	}
	// })
	...Platform.select({
		ios: {
			fontFamily: "Effra Heavy"
		},
		android: {
			fontFamily: "Effra-Heavy"
		}
	})
};
export const EffraRegular = {
	fontFamily: "Effra-Regular"
};
