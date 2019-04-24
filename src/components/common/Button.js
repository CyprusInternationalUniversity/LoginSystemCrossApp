import React from "react";
import {
	View,
	TouchableOpacity,
	Platform,
	StyleSheet,
	ActivityIndicator,
	Text
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Icon } from "native-base";
import { wClr } from "../../styles/index.style";
import { AvenirLTStdBook, AvenirLTStdBlack } from "../../styles/font.style";

const GButton = (
	{
		leftIcon,
		rightIcon,
		leftIconStyles,
		rightIconStyles,
		title,
		allCaps,
		whiteColors,
		bold,
		containerStyles,
		buttonTextStyles,
		onPress,
		loading,
		isDisabled
	},
	whatever
) => (
	<TouchableOpacity onPress={isDisabled ? null : onPress} {...whatever}>
		<View style={[styles.buttonContainer, containerStyles]}>
			{leftIcon ? (
				<Icon
					// type="material-community"
					// name="key-variant"
					type={leftIcon.type}
					name={leftIcon.name}
					size={28}
					color={whiteColors ? "#FFF" : "#3b3b3b"}
					iconStyle={[styles.iconStyles, leftIconStyles]}
					containerStyle={styles.leftIcon}
				/>
			) : null}
			<Text
				style={[
					bold ? AvenirLTStdBlack : AvenirLTStdBook,
					styles.buttonTitle,
					whiteColors ? wClr : null,
					buttonTextStyles
				]}
			>
				{allCaps ? title.toUpperCase() : title}
			</Text>

			{loading ? (
				<ActivityIndicator
					style={styles.loadingIndicator}
					size="small"
					color="#0000ff"
				/>
			) : null				
			}
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: "#fcfcfc",
		width: "100%",
		height: hp("7.25%"),
		overflow: "hidden",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderColor: "#787878",
		borderWidth: 1,
		borderRadius: 8
	},
	buttonTitle: {
		fontSize: wp("5%"),
		top: 3,
		left: 6
	},
	iconStyles: {
		// transform: [{ rotateY: "-180deg" }]
	},
	iconLeftRotate: {
		transform: [{ rotateY: "-180deg" }]
	},
	iconRightRotate: {
		...Platform.select({
			ios: {
				transform: [
					{ rotateY: "-180deg" },
					{ scaleX: 2.2 },
					{ scaleY: 2.2 }
				]
			},
			android: {
				transform: [{ rotateY: "-180deg" }]
			}
		})
		// transform: [{ rotateY: "-180deg" }, { scaleX: 2.2 }, { scaleY: 2.2 }]
		// transform: [{ rotateY: "-180deg" }]
	},
	iconRightStyles: {
		...Platform.select({
			ios: {
				opacity: 0.3,
				top: 8,
				right: 8,
				transform: [{ scaleX: 2.2 }, { scaleY: 2.2 }]
			},
			android: {
				opacity: 0.07
			}
		})
		// opacity: 0.2
		// top: 8,
		// right: 8
		// transform: [{ scaleX: 2.2 }, { scaleY: 2.2 }]
	},
	leftIcon: {
		paddingLeft: 10
	},
	rightIcon: {
		...Platform.select({
			ios: {
				top: -6
			},
			android: {
				top: 0
			}
		}),
		right: 3,
		paddingRight: 10
		// transform: [{ scaleX: "2" }, { scaleY: "2" }]
	},
	loadingIndicator: {
		left: -30
	}
});

export default GButton;
