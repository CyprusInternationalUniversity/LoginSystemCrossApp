import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Icon, Button, H2, StyleProvider } from "native-base";
import LoaderIndicator from "../../components/common/loader";
import getTheme from "../../../native-base-theme/components";
import CustomTheme from "../../styles/variables";
import Colors from "../../constants/Colors";
// Template container
import Template2 from "../../components/designTemplates/template2";
import { RetrieveItem } from "../../util/asyncStorage";
import { LoadKeyChain } from "../../util/keychain";
// styles
import { mt20, mb20, wClr } from "../../styles/index.style";
import { AvenirLTStdBlack, AvenirLTStdBook } from "../../styles/font.style";
import { AppSessionVerifierCall } from "../../actions/initappAction";

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		// backgroundColor: '#fff',
		alignItems: "center",
		justifyContent: "center",
	},
	buttonStyle: {
		marginLeft: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	buttonTextStyle: {
		fontSize: 20,
		// fontWeight: "bold"
	},
});

class WelcomeScreen extends React.Component {
	constructor() {
		super();
		this.loadingRef = React.createRef();
	}

	/**
	 * @summary As this is the First screen we need to check couple of stuff
	 *  1 - Check if the app is running first time ?
	 *  2 - If the App is not running first time, Then 2 things can happen
	 *
	 *  2a - Check session, if session is valid go to home screen using same session string
	 *  2b - If session is EXPIRED, then again 2 things should happen
	 *  2b-A - Create new session
	 *  2b-B - Save in asyncStorage
	 *  2b-C - Save in store (which it will be automatically while Action/Reduce time of redux)
	 *
	 *  3 - We ask for notification stuff
	 *
	 *  @description  1- Checking for app is running first time,
	 *  we are checking at the times of preparing the Routes in router/index
	 *  Otherwise we are Storing "DID_APP_RUN_BEFORE" value with promise
	 *  2-
	 *
	 * UPDATE: I DON"T KNOW WHAT I WROTE ABOVE SHIT. new update won't check store/redux for
	 * the async call of storage. New async call to determine if app has run before is integrated here below
	 *
	 *
	 * @memberof WelcomeScreen
	 */
	async componentDidMount() {
		const didAppRunBefore = await this.init();
		// should not be false
		if (didAppRunBefore === true) {
			this.props.AppSessionVerifierCall();
		}
	}

	componentWillUnmount = () => {
		if (this.loadingRef !== null) {
			this.loadingRef.current.closeActivityIndicator();
		}
	};

	/**
	 * @desc Call to async Storage for checking, if app has already run before or not
	 *  All secondly making sure we have username in storage before verifying through redux
	 * @return Boolean <True, False>
	 * @see for usage see componentDidMount()
	 */
	/* eslint-disable react/sort-comp  */
	/* eslint-disable class-methods-use-this  */
	async init() {
		const StoredFirstTimeStr = await RetrieveItem("DID_APP_RUN_BEFORE");
		// console.log("%c StoredFirstTimeStr", "background:gold;color:white");
		// console.log(
		// 	typeof StoredFirstTimeStr,
		// 	String(StoredFirstTimeStr),
		// 	JSON.stringify(StoredFirstTimeStr),
		// 	Boolean(StoredFirstTimeStr) === true
		// );
		// App is running for first time
		if (Boolean(StoredFirstTimeStr) === true) {
			// console.log("%c  NOT RUNNING FIRST TIME ACCORDING TO ASYNC STORAGE", "background:green;color:white");
			// we need to check 1 more thing to make DOUBLE/TRIPLE sure
			// that we have username and password
			const loadedKeyChainCredential = await LoadKeyChain();
			if (
				String(loadedKeyChainCredential.username) !== 0 &&
				String(loadedKeyChainCredential.username) !== "null" &&
				String(loadedKeyChainCredential.username) !== "undefined" &&
				String(loadedKeyChainCredential.password) !== 0 &&
				String(loadedKeyChainCredential.password) !== "null" &&
				String(loadedKeyChainCredential.password) !== "undefined"
			)
				return true;

			return false;
		}
		// console.log("%c APP IS RUNNING FIRST TIME ACCORDING TO ASYNC STORAGE", "background:red;color:white");
		return false;
	}

	goToLogin = () => Actions.login();

	goToRegister = () => Actions.register();

	render() {
		return (
			<Template2
				hasLogo
				hasTagLine
				// hasContentShadowBox
				// hasBack
				// HasBackComponent={() => <RouterBackBtn />}
			>
				<StyleProvider style={getTheme(CustomTheme)}>
					<View style={{ backgroundColor: "transparent" }}>
						<LoaderIndicator
							ref={this.loadingRef}
							visible={this.props.appSessionLoader === true}
							textContent="Loading..."
							textStyle={{ color: "#FFF", fontSize: 15 }}
						/>
						<View style={styles.container}>
							<View style={[mt20, { flexDirection: "row" }]}>
								<H2 style={AvenirLTStdBlack}>WELCOME TO THE</H2>
							</View>
							<View style={mb20}>
								<H2
									style={[
										AvenirLTStdBlack,
										{
											color: Colors.primaryAppColor,
										},
									]}
								>
									Login System App
								</H2>
							</View>
							<View style={{ width: "100%" }}>
								<Text style={mb20}>
									Your are a Second away from awesomeness. Please Login touching Sign In button below. Thank you!
								</Text>
								<Button iconLeft large block style={styles.buttonStyle} onPress={this.goToLogin}>
									<Icon name="key-variant" type="MaterialCommunityIcons" style={{ left: -10 }} />
									<Text style={[AvenirLTStdBook, styles.buttonTextStyle, wClr]}>Sign In</Text>
								</Button>
								<Button iconLeft bordered large block style={styles.buttonStyle} onPress={this.goToRegister}>
									<Icon name="page-edit" type="Foundation" style={{ left: -10 }} />
									<Text style={[AvenirLTStdBook, styles.buttonTextStyle]}>Sign Up</Text>
								</Button>
							</View>
						</View>
					</View>
				</StyleProvider>
			</Template2>
		);
	}
}

export default connect(
	null,
	{
		AppSessionVerifierCall,
	}
)(WelcomeScreen);
