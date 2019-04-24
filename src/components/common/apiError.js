import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent",
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	background: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.25)",
	},
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 80,
	},
	textContainer: {
		flex: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	textContent: {
		top: 55,
		height: 50,
		fontSize: 15,
		fontWeight: "bold",
	},
});

class APIError extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.textContainer, { ...this.props.indicatorStyle }]}>
					<Text style={[styles.textContent, this.props.textStyle]}>
						Sorry, There was error loading data from API, Please try again later
					</Text>
				</View>
			</View>
		);
	}
}
export default APIError;
