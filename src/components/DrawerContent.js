import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

import { DeleteItem } from "../util/asyncStorage";
import { DeleteKeyChainItem } from "../util/keychain";

import FullLogo from "./common/FullLogo";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingHorizontal: 20,
		justifyContent: "flex-start",
		// alignItems: 'center',
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: "#FFF",
	},
	menuButton: {
		fontSize: 22,
		paddingVertical: 10,
	},
});

class DrawerContent extends React.Component {
	static propTypes = {};

	static contextTypes = {
		drawer: PropTypes.object,
	};

	logOut = async () => {
		// delete saved auto login status
		await DeleteItem("DID_APP_RUN_BEFORE");
		// delete saved credentails
		await DeleteKeyChainItem("GenericPassword");

		return Actions.welcomeScreen();
	};

	render() {
		return (
			<View style={styles.container}>
				<FullLogo logoHeight={100} logoWidth={100} />
				<View style={{ justifyContent: "flex-start", alignItems: "flex-start", paddingTop: 20 }}>
					<Button style={styles.menuButton} onPress={Actions.main_home}>
						Home
					</Button>
					<Button style={styles.menuButton} onPress={Actions.main_settings}>
						Settings
					</Button>
					<Button style={styles.menuButton} onPress={Actions.changePassword}>
						Change Password
					</Button>
					<Button style={styles.menuButton} onPress={this.logOut}>
						Sign Out
					</Button>
				</View>
			</View>
		);
	}
}

export default DrawerContent;
