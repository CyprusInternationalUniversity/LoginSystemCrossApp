import React, { PureComponent } from "react";
import { View, StyleSheet, /* Dimensions, */ Text } from "react-native";
// connect react redux
import { connect } from "react-redux";
// route action
// import { Actions } from "react-native-router-flux";
// textinput
import { Hoshi } from "react-native-textinput-effects";
// styles import
import { Container, Content, Button, Toast } from "native-base";
import { mt20, wClr } from "../../styles/index.style";
import { AvenirLTStdBlack, AvenirLTStdBook } from "../../styles/font.style";
import { registerCustomer } from "../../actions/authActions";

const styles = StyleSheet.create({
	labelField: {
		color: "#000",
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

class Registration extends PureComponent {
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
		this.SubmitRegister = this.SubmitRegister.bind(this);
	}

	// After loading saving the Category data for local use
	/* static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps);
		console.log(prevState);

		// compare incoming new Props from reducer to local state
		if (
			nextProps.registerationErrorStatus !== prevState.registerationErrorStatus &&
			nextProps.registerationsuccessStatus !== prevState.registerationsuccessStatus
		) {
			// lets save category remote info into local state but we can't use setstate here
			return {
				registerationErrorStatus: nextProps.registerationErrorStatus,
				registerationsuccessStatus: nextProps.registerationsuccessStatus,
			};
		}

		return null; // no need localstate is FALSE already for didweAddedCategory
	} */

	// setting state with remote info of category
	componentDidUpdate(prevProps, prevState) {
		// console.log(prevProps);
		// console.log(prevState);
		// console.log(this.state);
		/* // compare states, 1- PrevState updated by getDerivedStateFromProps(), 2- locally state
		if (prevState.registerationErrorStatus === this.state.registerationErrorStatus) {
			// set state with category remote info
			this.setState({
				categoryRemoteObj: prevState.categorySingle,
			});
		} */
		/*
		 * SUCCESS
		 */
		// if (this.props.registerationErrorStatus !== prevProps.registerationsuccessStatus) {
		/* if (this.props.registerationsuccessStatus === true && this.props.registerationErrorStatus === false) {
			Toast.show({
				text: this.props.registerationMessage,
				buttonText: "Okay",
				duration: 3000,
				type: "success",
			});
			return Actions.reset("login");
		} */
		/*
		 * ERROR
		 */
		// if (this.props.registerationErrorStatus !== prevProps.registerationsuccessStatus) {
		/* if (this.props.registerationsuccessStatus === false && this.props.registerationErrorStatus === true) {
			Toast.show({
				text: "Validation error. Please try again.",
				buttonText: "Okay",
				duration: 3000,
				type: "danger",
			});
		} */
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
	SubmitRegister() {
		// return Actions.pop();
		const isValided = this.validate();
		if (isValided) {
			// TODO: send server req
			const credentialForServer = {
				email: this.state.email,
				password: this.state.password,
			};
			this.props.registerCustomer(credentialForServer);
		}
	}

	// rendering of component
	render() {
		// const { height, width } = Dimensions.get("window");
		const { email, password } = this.state;
		// Destructuring Styles objects
		const {
			// loginBtn,
			labelField,
		} = styles;
		return (
			<Container>
				<Content
					style={{
						padding: 25,
					}}
				>
					<View>
						<Text style={[AvenirLTStdBlack, { fontSize: 30 }]}>Create Account</Text>
						<Text>Please note that creating account is completely free of charge. Feel free to Create anytime.</Text>
					</View>
					<View style={{ marginTop: 35 }}>
						<Hoshi
							label={<Text style={labelField}>Email</Text>}
							borderColor="##e50000"
							value={email}
							onChangeText={value => this.setStateHandler("email", value)}
						/>
						<Hoshi
							label={<Text style={labelField}>Create Password</Text>}
							style={mt20}
							borderColor="##e50000"
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							value={password}
							onChangeText={value => this.setStateHandler("password", value)}
						/>
						<Button iconLeft block style={[styles.buttonStyle]} onPress={this.SubmitRegister}>
							<Text style={[AvenirLTStdBook, styles.buttonTextStyle, wClr]}>SIGN UP</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	registerationLoader: state.auth.registerationLoader,
	registerationMessage: state.auth.registerationMessage,
	registerationStatus: state.auth.registerationStatus,
	registerationErrorStatus: state.auth.registerationErrorStatus,
	registerationsuccessStatus: state.auth.registerationsuccessStatus,
});

export default connect(
	mapStateToProps,
	{
		registerCustomer,
	}
)(Registration);
