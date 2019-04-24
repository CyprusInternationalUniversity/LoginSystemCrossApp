import { Toast } from "native-base";
import { Actions } from "react-native-router-flux";
import { stringify } from "query-string";
import axios from "axios";
import { getSessionFromKeychain, setNewPasswordToKeychain } from "./commonAction";
import {
	CHANGE_CUSTOMER_PASSWORD,
	CHANGE_CUSTOMER_PASSWORD_SUCCESS,
	CHANGE_CUSTOMER_PASSWORD_FAIL,
	REGISTRATION_SUBMIT,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
	LOGIN_USER_SUBMIT,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
} from "./types";
import { API_BASE_URL, LOGIN_CUSTOMER_EP, CHANGE_CUSTOMER_PASSWORD_EP, POST_CUSTOMERS_EP } from "../static/apiConstants";
import { SaveKeyChain } from "../util/keychain";
// import API from "../services/api";

export const changeCustomerPassword = credentials => {
	return async dispatch => {
		dispatch({ type: CHANGE_CUSTOMER_PASSWORD });
		axios
			.post(`${API_BASE_URL}${CHANGE_CUSTOMER_PASSWORD_EP}?${stringify(await getSessionFromKeychain())}`, credentials)
			.then(response => {
				Toast.show({
					text: "Password changed sucessfully.",
					buttonText: "Okay",
					duration: 1800,
					type: "success",
				});
				dispatch({
					type: CHANGE_CUSTOMER_PASSWORD_SUCCESS,
					payload: {
						message: "Password changed sucessfully.",
						status: response.status,
					},
				});
				// saving for next auto login
				setNewPasswordToKeychain(credentials.newPassword);
				return Actions.pop();
			})
			.catch(error => {
				const output = JSON.parse(JSON.stringify(error));
				// console.log(output);
				let message = "";
				if (output.response) {
					message = output.response.data.error.message ? output.response.data.error.message : output.response.status;
				} else {
					message = "Connection refused, please check the server";
				}
				console.log(message);
				// return dispatch({ type: REGISTRATION_FAIL });
				Toast.show({
					text: "There was error. Please check your old and new password.",
					buttonText: "Okay",
					duration: 2500,
					type: "danger",
				});
				return dispatch({
					type: CHANGE_CUSTOMER_PASSWORD_FAIL,
					payload: {
						message,
						status: output.response.status,
					},
				});
			});
	};
};

export const registerCustomer = credentials => {
	return dispatch => {
		dispatch({ type: REGISTRATION_SUBMIT });
		axios
			.post(`${API_BASE_URL}${POST_CUSTOMERS_EP}`, credentials)
			.then(response => {
				Toast.show({
					text: "Registeration was sucessfull. Thank you",
					buttonText: "Okay",
					duration: 1800,
					type: "success",
				});
				dispatch({
					type: REGISTRATION_SUCCESS,
					payload: {
						message: "Registeration was sucessfull. Thank you",
						status: response.status,
					},
				});
				return Actions.reset("login");
			})
			.catch(error => {
				const output = JSON.parse(JSON.stringify(error));
				// console.log(output);
				let message = "";
				if (output.response) {
					message = output.response.data.error.message ? output.response.data.error.message : output.response.status;
				} else {
					message = "Connection refused, please check the server";
				}
				console.log(message);
				// return dispatch({ type: REGISTRATION_FAIL });
				Toast.show({
					text: "Validation error. Please try again.",
					buttonText: "Okay",
					duration: 1800,
					type: "danger",
				});
				return dispatch({
					type: REGISTRATION_FAIL,
					payload: {
						message,
						status: output.response.status,
					},
				});
			});
	};
};

export const loginCustomer = (credentials, returnPromise) => {
	return dispatch => {
		dispatch({ type: LOGIN_USER_SUBMIT });

		return (
			axios
				.post(`${API_BASE_URL}${LOGIN_CUSTOMER_EP}`, credentials)
				// API.RegisterProcess(credentials)
				.then(response => {
					// const output = JSON.parse(JSON.stringify(response));
					// console.log(output.data.id);
					const sessionID = response.data.id;
					const userID = response.data.userId;
					console.log(sessionID);

					/* save credentials encrypted in the device */
					SaveKeyChain(credentials.email, credentials.password, sessionID, userID);

					Toast.show({
						text: "Login was successful!",
						buttonText: "Okay",
						duration: 800,
						type: "success",
					});
					dispatch({
						type: LOGIN_USER_SUCCESS,
						payload: {
							message: "Login was sucessfull. Thank you.",
							status: response.status,
						},
					});

					return returnPromise ? true : Actions.drawer();
				})
				.catch(error => {
					const output = JSON.parse(JSON.stringify(error));
					// console.log(output);
					let message = "";
					if (output.response) {
						message = output.response.data.message ? output.response.data.message : output.response.status;
					} else {
						message = "Connection refused, please check the server";
					}
					// console.log(message);
					// return dispatch({ type: REGISTRATION_FAIL });
					Toast.show({
						text: "Please check your email and password again.",
						buttonText: "Okay",
						duration: 1800,
						type: "Danger",
					});
					return dispatch({
						type: LOGIN_USER_FAIL,
						payload: {
							message,
							status: output.response.status,
						},
					});
				})
		);
	};
};
