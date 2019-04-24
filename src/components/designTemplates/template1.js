import React, { PureComponent } from "react";
import {
	Image,
	View,
	StyleSheet,
	ScrollView,
	// Dimensions,
	Platform
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LinearGradient } from 'expo';
// import LinearGradient from "react-native-linear-gradient";

import { alignCenter } from "../styles/index.style";

import FullLogo from "../common/FullLogo";

const TopBanner = require("../../static/img/topbanner.png");
const WaterMark = require("../../static/img/watermark.png");
const WaterMarkNethouse = require("../../static/img/watermark_N.png");

// const dHeight = Dimensions.get("window").height;
// const dWidth = Dimensions.get("window").width;

class Template1 extends PureComponent {
	render() {
		const {
			hasNoBanner = false,
			HeaderBannerComponent,
			children,
			hasLogo,
			customBodyStyles,
			HasTagLineComponent,
			HasWaterMarkComponent,
			bigWaterMark,
			hasFooterMenu,
			HasFooterComponent
		} = this.props;
		const {
			container,
			header,
			footer,
			footerBanner,
			footerBig,
			footerBigBanner,
			// headerLeftCircle,
			ContentLeftGreyCircle,
			ContentLeftLightBlueCircle,
			ContentLeftVeryLightBlueCircle,
			ContentMiddleCircle,
			headerBanner,
			ContentHeader,
			ContentBody,
			ContentFooter,
			mainContent,
			Content,
			footerMenu
		} = styles;

		return (
			<View style={container}>
				<View style={hasNoBanner ? { height: 130 } : header}>
					{hasNoBanner === false && HeaderBannerComponent ? (
						<HeaderBannerComponent />
					) : (
						hasNoBanner === false && (
							<Image
								source={TopBanner}
								style={[headerBanner]}
							/>
						)
					)}

					{/* replaced by image */}
					{/* <View style={headerLeftCircle} opacity={0.85} /> */}
				</View>
				<View style={mainContent}>
					<LinearGradient
						colors={["#e9e9e9", "#fefefe99", "#fefefe99"]}
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 0.5, y: 1.0 }}
						locations={[0, 0.5, 0.6]}
						style={ContentLeftGreyCircle}
						pointerEvents="none"
						// opacity={0.62}
					/>
					{/* <View style={ContentLeftGreyCircle} opacity={0.62} /> */}
					<LinearGradient
						colors={["#e2f4fa", "#d6eaf0", "#fefefe99"]}
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 0.5, y: 1.0 }}
						locations={[0, 0.5, 0.6]}
						style={ContentLeftLightBlueCircle}
						pointerEvents="none"
					/>
					<View
						style={ContentLeftVeryLightBlueCircle}
						opacity={0.3}
						pointerEvents="none"
					/>
					<LinearGradient
						start={{ x: 0.0, y: 0.25 }}
						end={{ x: 0.5, y: 1.0 }}
						locations={[0, 0.2, 0.5, 0.6]}
						colors={["#fcfcfc", "#fcfcfc99", "#f7f7f7", "#f9f9f9"]}
						style={ContentMiddleCircle}
						pointerEvents="none"
						// opacity={0.7}
					/>
					{/* <View style={ContentMiddleCircle} /> */}
					<View
						style={[
							Content,
							{
								marginTop: hasLogo ? 18 : -35
								// marginTop: hasLogo ? wp("6%") : -35
							}
						]}
					>
						<View
							style={[
								ContentHeader,
								{
									// height: hasLogo ? 100 : 0,
									height: hasLogo ? wp("29%") : 0
									// backgroundColor: "#00000050"
								}
							]}
						>
							{hasLogo ? <FullLogo /> : null}
							{HasTagLineComponent ? (
								<HasTagLineComponent />
							) : null}
						</View>
						<ScrollView contentContainerStyle={alignCenter}>
							<View style={[ContentBody, customBodyStyles]}>
								{children}
								{/* <Text>
									Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy
									text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled
									it to make a type specimen book. It has
									survived not only five centuries, but also
									the leap into electronic typesetting,
									remaining essentially unchanged. It was
									popularised in the 1960s with the release of
									sheets containing Lorem Ipsum passages, and
									more recently with desktop publishing
									software like Aldus PageMaker including
									versions of Lorem Ipsum
								</Text> */}
							</View>
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
						pointerEvents="none"
					/>
				</View>
				<View
					style={bigWaterMark ? footerBig : footer}
					pointerEvents={bigWaterMark ? "none" : "auto"}
				>
					<Image
						source={bigWaterMark ? WaterMarkNethouse : WaterMark}
						style={bigWaterMark ? footerBigBanner : footerBanner}
					/>
					{HasWaterMarkComponent ? <HasWaterMarkComponent /> : null}
				</View>
				{hasFooterMenu ? (
					<View style={footerMenu}>
						{HasFooterComponent ? <HasFooterComponent /> : null}
					</View>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "white",
		overflow: "hidden" // otherwise on side menu the outer circles are appearing
		// alignItems: "center",
		// justifyContent: "center",
	},
	header: {
		// backgroundColor: "#0a0",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		height: 250
		// zIndex: 1
	},
	headerBanner: {
		flex: 1,
		// remove width and height to override fixed static size
		width: "100%",
		height: null
	},
	footerMenu: {
		// backgroundColor: "#00000095"
	},
	footer: {
		// backgroundColor: "#00000095",
		justifyContent: "center",
		alignItems: "flex-end",
		width: 100,
		height: 100, // 165x275
		position: "absolute",
		bottom: 0,
		right: 0,
		flex: 100
	},

	footerBanner: {
		flex: 1,
		width: 65,
		height: null
	},
	footerBig: {
		//backgroundColor: "#00000095",
		justifyContent: "center",
		alignItems: "flex-end",
		width: 140,
		height: 140, // 165x275
		position: "absolute",
		bottom: 0,
		right: 0,
		flex: 100
	},
	footerBigBanner: {
		flex: 1,
		width: 200,
		height: null
	},
	headerLeftCircle: {
		backgroundColor: "#35c3ed",
		width: 150,
		height: 150,
		borderRadius: 75,
		transform: [{ scaleX: 3 }, { scaleY: 3 }],
		position: "absolute",
		right: -115,
		top: -50
	},
	mainContent: {
		// zIndex: 0,
		flex: 1,
		// height: hp("100%") - 90,
		marginTop: -105 // hp
		// marginTop: hp("-10%")
		// backgroundColor: "#35c3ed30"
		// marginTop: 10,
		// marginTop: 100,
		// padding: 20,
		// backgroundColor: "skyblue",
		// alignItems: "center",
		// justifyContent: "center"
	},
	Content: {
		// backgroundColor: "#0a0",
		flex: 1,
		height: hp("100%") - 250,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center"
		// zIndex: 80 // CAUSING ANDROID to not have touch on watermark
	},
	ContentHeader: {
		// backgroundColor: "lightgreen",
		// marginTop: -60
		// height: 100,
		overflow: "hidden",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	ContentBody: {
		paddingTop: wp("2%"),
		// padding: 30,
		// backgroundColor: "#0a0",
		width: wp("80%"), // 80% of the view
		// width: (dWidth / 100) * 80, // 80% of the view
		overflow: "hidden"
	},

	ContentFooter: {
		// backgroundColor: "#0a0",
		// marginTop: 200,
		width: "100%",
		height: hp("100%") - 450,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: -1
	},

	ContentLeftGreyCircle: {
		backgroundColor: "#e9e9e9",
		// width: dWidth - "10%",
		width: "80%",
		height: 300,
		borderRadius: wp("100%") / 2,
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
	ContentLeftLightBlueCircle: {
		backgroundColor: "#e4f5fa", // d6eaf0 // e4f5fa
		width: "80%",
		height: 300,
		borderRadius: wp("100%") / 2,
		transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
		position: "absolute",
		top: 140,
		left: -150
	},
	ContentLeftVeryLightBlueCircle: {
		backgroundColor: "#FFF",
		width: "80%",
		height: 300,
		borderRadius: wp("100%") / 2,
		transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
		position: "absolute",
		top: 160,
		left: -160
	},
	ContentMiddleCircle: {
		// backgroundColor: "#fcfcfc",
		width: wp("100%"),
		height: wp("100%"),
		borderRadius: wp("100%") / 2,
		position: "absolute",
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

export default Template1;
