import React from "react";
import { Platform, StatusBar, View, StyleSheet } from "react-native";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { AppLoading, Font } from "expo";
// import { FontAwesome, Foundation, Entypo } from '@expo/vector-icons';
import ConfigureStore from "./src/store";
import AppNavigator from "./src/router";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	statusBarBackground: {
		height: Platform.OS === "ios" ? 18 : 0, // this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
	},
	statusBarUnderlay: {
		height: 24,
		backgroundColor: "rgba(0,0,0,0.2)",
	},
});

const ConfiguredStore = ConfigureStore();
export default class App extends React.PureComponent {
	state = {
		isLoadingComplete: false,
	};

	loadResourcesAsync = async () => {
		return Promise.all([
			Font.loadAsync({
				// custom font
				"AvenirLTStd-Black": require("./assets/fonts/AvenirLTStd-Black.otf"),
				"AvenirLTStd-Book": require("./assets/fonts/AvenirLTStd-Book.otf"),
				"AvenirLTStd-Heavy": require("./assets/fonts/AvenirLTStd-Heavy.otf"),
				"Effra Heavy": require("./assets/fonts/Effra-Heavy.ttf"),
				"Effra-Heavy": require("./assets/fonts/Effra-Heavy.ttf"),
				"Effra-Regular": require("./assets/fonts/Effra-Regular.ttf"),
				// native base fonts
				Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
				Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
				"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
			}),
		]);
	};

	handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading startAsync={this.loadResourcesAsync} onError={this.handleLoadingError} onFinish={this.handleFinishLoading} />
			);
		}
		return (
			<Root>
				<Provider store={ConfiguredStore}>
					<View style={styles.container}>
						{Platform.OS === "ios" && <View style={styles.statusBarBackground} />}
						{Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}
						<StatusBar backgroundColor="#fff" barStyle="light-content" translucent={false} />
						<AppNavigator />
					</View>
				</Provider>
			</Root>
		);
	}
}
