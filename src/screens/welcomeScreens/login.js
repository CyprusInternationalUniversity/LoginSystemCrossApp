import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { Container, Content, Button, StyleProvider, Toast } from "native-base";
// route action
// import { Actions } from "react-native-router-flux";
// connect react redux
// textinput
import { Hoshi } from "react-native-textinput-effects";
// styles import
import { connect } from "react-redux";
import getTheme from "../../../native-base-theme/components";
import CustomTheme from "../../styles/variables";
import { mt20, wClr } from "../../styles/index.style";
import { AvenirLTStdBlack, AvenirLTStdBook } from "../../styles/font.style";
import { loginCustomer } from "../../actions/authActions";

const styles = StyleSheet.create({
	labelField: {
		color: "#FFF",
		// backgroundColor: "rgba(100,0,0,0.4)"
	},
	backgroundImageContainer: {
		position: "absolute",
		top: 0,
		left: 0,
	},
	backgroundOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	buttonStyle: {
		marginTop: 35,
	},
	buttonTextStyle: {
		fontWeight: "bold",
		fontSize: 15,
		letterSpacing: 1,
	},
});

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// registerationErrorStatus: false,
			// registerationsuccessStatus: false,
			email: "",
			password: "",
		};
		this.setStateHandler = this.setStateHandler.bind(this);
		this.validate = this.validate.bind(this);
		this.SubmitLogin = this.SubmitLogin.bind(this);
	}

	setStateHandler(type, value) {
		console.log(type, value);
		return this.setState({
			[type]: value,
		});
	}

	validate() {
		// console.log(this.state);
		if (this.state.email.length === 0 || this.state.password.length === 0) {
			Toast.show({
				text: "Please check your email and password",
				buttonText: "Okay",
				duration: 3000,
			});
			return false;
		}
		if (this.state.email.length !== 0 && this.state.password.length < 5) {
			Toast.show({
				text: "Password must be greater than 5 Characters",
				buttonText: "Okay",
				duration: 3000,
			});
			return false;
		}
		return true;
	}

	// Submit call of login
	SubmitLogin() {
		// return Actions.drawer();
		const isValided = this.validate();
		if (isValided) {
			// TODO: send server req
			const credentialForServer = {
				email: this.state.email,
				password: this.state.password,
			};
			this.props.loginCustomer(credentialForServer);
		}
	}

	// rendering of component
	render() {
		const { height, width } = Dimensions.get("window");
		const { email, password } = this.state;
		// Destructuring Styles objects
		const {
			// loginBtn,
			labelField,
		} = styles;
		return (
			<StyleProvider style={getTheme(CustomTheme)}>
				<Container>
					<View style={styles.backgroundImageContainer}>
						<Image source={require("../../../assets/ciuArialView.jpg")} style={{ height, width }}  />
						<View style={styles.backgroundOverlay} />
					</View>
					<Content
						style={{
							marginTop: 80,
							padding: 25,
						}}
					>
						<View>
							<Text style={[wClr, AvenirLTStdBlack, { fontSize: 45 }]}>Welcome Back</Text>
							<Text style={wClr}>Sign in to Continue</Text>
						</View>
						<View style={{ marginTop: 35 }}>
							<Hoshi
								label={<Text style={labelField}>Email</Text>}
								borderColor="##e50000"
								value={email}
								onChangeText={value => this.setStateHandler("email", value)}
							/>
							<Hoshi
								label={<Text style={labelField}>Password</Text>}
								style={mt20}
								borderColor="##e50000"
								secureTextEntry
								autoCapitalize="none"
								autoCorrect={false}
								value={password}
								onChangeText={value => this.setStateHandler("password", value)}
							/>
							<Button iconLeft block style={[styles.buttonStyle]} onPress={this.SubmitLogin}>
								<Text style={[AvenirLTStdBook, styles.buttonTextStyle, wClr]}>SIGN IN</Text>
							</Button>
						</View>
					</Content>
				</Container>
			</StyleProvider>
		);
	}
}

export default connect(
	null,
	{
		loginCustomer,
	}
)(Login);
