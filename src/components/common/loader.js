import React, { PureComponent } from "react";
import Modal from "react-native-modal";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

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

class LoaderIndicator extends PureComponent {
	state = { animating: true };

	componentDidMount() {
		this.closeActivityIndicator();
	}

	closeActivityIndicator = () => {
		// console.log("Loader is CLOSED");
		this.setState({
			visible: false, // eslint-disable-line react/no-unused-state
		});
	};

	render() {
		const { animating } = this.state;
		return (
			<Modal
				animationIn="zoomInDown"
				animationOut="zoomOutUp"
				backdropOpacity={0.5}
				isVisible={Boolean(this.props.visible)}
				hideModalContentWhileAnimating
			>
				<View style={styles.container}>
					<ActivityIndicator animating={animating} color="white" size="large" style={styles.activityIndicator} />
					<View style={[styles.textContainer, { ...this.props.indicatorStyle }]}>
						<Text style={[styles.textContent, this.props.textStyle]}>{this.props.textContent}</Text>
					</View>
				</View>
			</Modal>
		);
	}
}
export default LoaderIndicator;
