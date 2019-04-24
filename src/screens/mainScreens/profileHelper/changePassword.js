import React from "react";
import { Text, View, Dimensions, ActivityIndicator, Keyboard } from "react-native";
// import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Container, Content, Item, Input, Button, Form, StyleProvider, Toast } from "native-base";
// styles
import CustomTheme from "../../../styles/variables";
import getTheme from "../../../../native-base-theme/components";
// import { AvenirLTStdBlack, AvenirLTStdBook, EffraRegular } from "../../../styles/font.style";
import { mt20, wClr, mb20 } from "../../../styles/index.style";
import { changeCustomerPassword } from "../../../actions/authActions";

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			oldPassword: "",
			newPassword: "",
		};
		this.validation = this.validation.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 0);
	}

	/*
	 *	Call to server for change user password
	 */
	saveChangePassword = () => {
		Keyboard.dismiss();
		const checkValid = this.validation();
		console.log(checkValid);
		if (checkValid !== true)
			return Toast.show({
				text: "Please check all fields again",
				buttonText: "Okay",
				duration: 1800,
				type: "danger",
			});
		const { oldPassword, newPassword } = this.state;
		const ObjectToSend = {
			oldPassword,
			newPassword,
		};
		return this.props.changeCustomerPassword(ObjectToSend);
	};

	// validation of local states
	validation() {
		const { oldPassword, newPassword } = this.state;
		if (oldPassword === newPassword) return true;
		if (oldPassword.length > 0 && newPassword.length > 0) return true;
		return false;
	}

	// setting local states
	commonSetStateHandlers(type: string, value: string) {
		this.setState({
			[type]: value,
		});
	}

	render() {
		const { height } = Dimensions.get("window");
		if (this.state.loading) {
			return (
				<Container>
					<Content>
						<View style={{ alignItems: "center", justifyContent: "center", flex: 1, height }}>
							<ActivityIndicator
								animating
								color="rgba(200,2,51,1)"
								size="large"
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									height: 80,
								}}
							/>
						</View>
					</Content>
				</Container>
			);
		}
		return (
			<StyleProvider style={getTheme(CustomTheme)}>
				<Container>
					<Content padder>
						<Form>
							<Item last>
								<Input
									placeholder="Old Password"
									value={this.state.mobileNo}
									onChangeText={value => this.commonSetStateHandlers("oldPassword", value)}
								/>
							</Item>
							<Item last>
								<Input
									placeholder="New Password"
									value={this.state.company}
									onChangeText={value => this.commonSetStateHandlers("newPassword", value)}
								/>
							</Item>
						</Form>
						<Button full success block style={[mt20, mb20]} onPress={this.saveChangePassword}>
							<Text style={[wClr, { fontSize: 20 }]}>Change Password</Text>
						</Button>
					</Content>
				</Container>
			</StyleProvider>
		);
	}
}

export default connect(
	null,
	{
		changeCustomerPassword,
	}
)(ChangePassword);
