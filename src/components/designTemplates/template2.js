import React, { PureComponent } from "react";
import {
	Image,
	View,
	StyleSheet,
	ScrollView,
	Dimensions,
	Platform,
	Text
} from "react-native";
import {
	widthPercentageToDP as wp
	// heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LinearGradient } from 'expo';
import Colors from "../../constants/Colors";

// import LinearGradient from "react-native-linear-gradient";
// import { EffraHeavy } from "../styles/font.style";
import FullLogo from "../common/FullLogo";

const WaterMark = require("../../../assets/watermark.png");

const dHeight = Dimensions.get("window").height;
const dWidth = Dimensions.get("window").width;

class Template2 extends PureComponent {
	render() {
		const {
			children,
			hasLogo,
			hasTagLine,
			hasHeader,
			HasHeaderComponent,
			hasBack,
			HasBackComponent,
			hasContentShadowBox,
			customStyles
		} = this.props;
		const {
			container,
			header,
			footer,
			headerRightCircle,
			ContentLeftGreyCircle,
			ContentMiddleCircle,
			footerBanner,
			ContentHeader,
			ContentBodyWithShadow,
			ContentBodyNoShadow,
			ContentFooter,
			mainContent,
			Content
		} = styles;

		return (
			<View style={container}>
				<View style={header}>
					<View style={headerRightCircle} />
				</View>
				<View style={mainContent}>
					<LinearGradient
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 0.5, y: 1.0 }}
						locations={[0, 0.2, 0.5, 0.6]}
						colors={["#fcfcfc", "#fcfcfc99", "#f7f7f7", "#f9f9f9"]}
						style={ContentMiddleCircle}
						// opacity={0.7}
					/>
					{/* <View style={ContentMiddleCircle} /> */}
					<View style={Content}>
						<View
							style={[
								ContentHeader,
								{
									width: "100%",
									// backgroundColor: "brown",
									// height: hasBack ? 125 : 80
									height: 135
								}
							]}
						>
							<View style={styles.BackButtonComponent}>
								{hasBack && HasBackComponent ? (
									<HasBackComponent />
								) : null}
							</View>
							{hasLogo ? (
								<FullLogo logoHeight={110} logoWidth={110} />
							) : null}
							{hasTagLine ? (
								<Text
									style={[
										// EffraHeavy,
										{
											color: "#a2a2a1",
											fontSize: 13,
											// top: -10,
											textTransform: "uppercase"
										}
									]}
								>
									{"Change is the end result of all true learning"}
								</Text>
							) : null}
							{/* {hasBack && HasBackComponent ? (
								<HasBackComponent />
							) : null} */}
						</View>
						<View
							style={{
								// backgroundColor: "#00000010",
								width: wp("90%")
							}}
						>
							{hasHeader && HasHeaderComponent ? (
								<HasHeaderComponent />
							) : null}
						</View>
						<ScrollView>
							{hasContentShadowBox ? (
								<View
									style={[
										ContentBodyWithShadow,
										customStyles
									]}
								>
									{children}
								</View>
							) : (
								<View
									style={[ContentBodyNoShadow, customStyles]}
								>
									{children}
								</View>
							)}
						</ScrollView>
					</View>
					<LinearGradient
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 0.5, y: 1.0 }}
						locations={[0, 0.2, 0.5, 0.6]}
						colors={[
							"#fcfcfc99",
							"#fcfcfc99",
							"#f7f7f7",
							"#f9f9f9"
						]}
						style={ContentFooter}
					/>
				</View>
				<View style={footer} pointerEvents="none">
					<Image source={WaterMark} style={footerBanner} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: "hidden" // otherwise on side menu the outer circles are appearing
		// alignItems: "center",
		// justifyContent: "center",
		// backgroundColor: "white"
	},
	header: {
		// zIndex: 1,
		// backgroundColor: "#00000050",
		height: 165
	},
	headerRightCircle: {
		backgroundColor: Colors.primaryAppColor,
		width: 150,
		height: 150,
		borderRadius: 75,
		transform: [{ scaleX: 3 }, { scaleY: 3 }],
		position: "absolute",
		left: -155,
		top: -120
	},
	BackButtonComponent: {
		position: "absolute",
		top: 10,
		left: 10
	},
	ContentHeader: {
		// marginTop: -60
		// flex: 1,
		// paddingBottom: 30,
		// backgroundColor: "lightgreen",
		// height: hasBack ? 130 : 80,
		overflow: "hidden",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	mainContent: {
		flex: 1,
		height: dHeight - 90,
		marginTop: -10
		// zIndex: 0
		// backgroundColor: "#35c3ed30"
	},
	footer: {
		// backgroundColor: "#00000095",
		justifyContent: "center",
		alignItems: "flex-end",
		width: 170,
		height: 80,
		position: "absolute",
		bottom: 10,
		left: 10,
		//left: -30,
		opacity: 0.12,
		transform: [
			{ scale: 1 },
		],
		// zIndex: 0
	},
	footerBanner: {
		flex: 1,
		// width: 200,
		alignSelf: "stretch",
		width: "100%",
		height: null
		// zIndex: 100
	},
	Content: {
		// backgroundColor: "#0a0",
		flex: 1,
		height: dHeight - 250,
		marginTop: -120,
		justifyContent: "flex-start",
		alignItems: "center",
		zIndex: 80
	},
	ContentBodyNoShadow: {
		// marginTop: 80,
		// margin: 40,
		width: wp("90%"), // 80% of the view
		padding: 0

		// zIndex: 100,
		// overflow: "hidden"

		// backgroundColor: "#FFF"
		// paddingTop: 10,
		// padding: 20
	},
	ContentBodyWithShadow: {
		width: wp("90%"), // 80% of the view (dWidth / 100) * 80
		// width: (dWidth / 100) * 80, // 80% of the view (dWidth / 100) * 80
		// width: "100%", // 80% of the view (dWidth / 100) * 80
		// zIndex: 100,
		// overflow: "visible",

		marginTop: 10,
		// margin: 40,
		// backgroundColor: "#FFF",
		backgroundColor: "#FFF",
		paddingTop: 10,
		padding: 20,
		// shadow IOS
		shadowColor: "#00000075",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.5,
		shadowRadius: 4,
		// shadow android
		elevation: 4,
		// outlineProvider: "bounds",
		// border
		borderRadius: 5
		// borderTopLeftRadius: 5,
		// borderTopRightRadius: 5,
		// borderBottomLeftRadius: 10,
		// borderBottomRightRadius: 10
	},
	ContentFooter: {
		// backgroundColor: "#0a0",
		// marginTop: 200,
		width: "100%",
		height: dHeight - 450,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},

	ContentLeftGreyCircle: {
		backgroundColor: "#e9e9e9",
		// width: dWidth - "10%",
		width: "80%",
		height: 300,
		borderRadius: dWidth / 2,
		transform: [{ scaleX: 2.1 }, { scaleY: 2.1 }],
		position: "absolute",
		top: 170,
		left: -50
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},

	ContentMiddleCircle: {
		// backgroundColor: "#fcfcfc",
		width: dWidth,
		height: dWidth,
		borderRadius: dWidth / 2,
		position: "absolute",
		// zIndex: 0,
		...Platform.select({
			ios: {
				transform: [
					{ scaleX: 1.8 },
					{ scaleY: 1.8 },
					{ skewX: "-45deg" },
					{ skewY: "-5deg" }
				],
				top: 220
			},
			android: {
				transform: [
					{ scaleX: 4 },
					{ scaleY: 1.4 },
					{ rotate: "-100deg" }
					// { skewX: "-45deg" },
					// { skewY: "-5deg" }
				],
				top: 240
			}
		})
	}
});

export default Template2;
