// typings
import {
	// init first time Language
	APP_SET_LANGUAGE,
	APP_DEVICE_LANG_DETECT,
	APP_DEVICE_LANG_DETECT_SUCCESS,
	APP_DEVICE_LANG_DETECT_FAIL,
	// APP_DEVICE_LANG_DETECT_FINISHED,
	// init validation
	APP_INIT_VALIDATOR_STARTED,
	APP_IS_RUNNING_FIRST_TIME,
	APP_IS_NOT_RUNNING_FIRST_TIME,
	SET_APP_FIRST_TIME_START,
	SET_APP_FIRST_TIME_SUCCESS,
	// SET_APP_FIRST_TIME_FAIL,
	SET_APP_FIRST_TIME_FINISHED,
	APP_INIT_VALIDATOR_FINISHED,
	APP_SESSION_VALIDATOR_STARTED,
	APP_SESSION_VALIDATOR_SUCCESS,
	APP_SESSION_VALIDATOR_FAILED,
	APP_SESSION_VALIDATOR_FINISHED,
	APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR,
	APP_SESSION_VALIDATOR_LOADER_RESET,
	APP_HAS_LOGIN_CREDENTIALS,
	APP_DOES_NOT_HAS_LOGIN_CREDENTIALS,
	REFRESHING_SESSION_ID_STARTED,
	REFRESHING_SESSION_ID_SUCCESS,
	REFRESHING_SESSION_ID_FAILED,
} from "./types";
// import {
// 	remoteValidateSessionID,
// 	getSessionFromKeychain,
// 	KeychainCredentialStatus,
// 	handleRemoteValidateResponse,
// } from "./commonAction";
// refresh session id incase we found keychain
import { loginCustomer } from "./authActions";
// async storage to remember the skip of intro
import { StoreItem, RetrieveItem } from "../util/asyncStorage";
// load credentials
import { LoadKeyChain } from "../util/keychain";
import { API_BASE_URL } from "../static/apiConstants";
// language
// import { getDeviceLang } from "../components/common/getDeviceLang";

/**
 *   @description Save "home.js" this.props.componentId in AsyncStorage
 */
export const SaveHomeComponentId = id => async dispatch => {
	await StoreItem("homeComponentId", id);
	dispatch({ type: "SAVED_HOME_COMPONENT_ID" });
};
/**
 *   @description Save "DID_APP_RUN_BEFORE" in AsyncStorage
 */
export const AppSetFirstTimeRun = () => async dispatch => {
	dispatch({ type: SET_APP_FIRST_TIME_START });
	await StoreItem("DID_APP_RUN_BEFORE", true);
	dispatch({
		type: SET_APP_FIRST_TIME_SUCCESS,
	});
	dispatch({ type: SET_APP_FIRST_TIME_FINISHED });
};

/**
 *   @description get device language status OR get language from asyncStorage
 */
export const AppLangVerifier = () => dispatch =>
	new Promise((resolve, reject) => {
		console.log("AppLangVerifier is being called");

		dispatch({ type: APP_DEVICE_LANG_DETECT });
		// check for saved language if it is saved BEFORE i.e if app has been used BEFORE
		RetrieveItem("DeviceLanguage")
			.then(language => {
				console.log(`%c DeviceLanguage from STORAGE ${language}`, "background:red;color:white");
				// console.log(status);
				if (language === "en") {
					dispatch({
						type: APP_DEVICE_LANG_DETECT_SUCCESS,
						payload: "en",
					});
					i18n.locale = "en";
					return resolve("en");
				}
				// otherwise set the device local
				dispatch({
					type: APP_DEVICE_LANG_DETECT_FAIL,
					payload: "tr",
				});
				// i18n.locale = "tr";
				// Current device language
				// console.log('language', RNLanguages.language);

				// i18n.locale = RNLanguages.language; // FUCK THIS LIBRARY
				// i18n.locale = RNLanguages.language;
				i18n.locale = "tr";
				return resolve("tr");
			})
			.catch(error => {
				//  Handle errors for Redux
				dispatch({ type: APP_DEVICE_LANG_DETECT_FAIL });
				reject(error);
				return false;
			});
	});
// .then(() => dispatch({ type: APP_DEVICE_LANG_DETECT_FINISHED }));

/*
 *	App language switcher
 *	Notify API that send data accordingly
 */
export const AppLangSwitcher = newLanguage => {
	const PostDataString = `s_lang=${newLanguage}&b_debug=1`;
	return dispatch => {
		// change locally
		dispatch({
			type: APP_SET_LANGUAGE,
			payload: newLanguage,
		});
		// change remotely
		// fetch(`${API_BASE_URL}${CHECK_PASSWORD}`, CHECK_PASSWORD, {
		return fetch(`${API_BASE_URL}${UPDATE_API_LANG}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: PostDataString,
		})
			.then(response => response.json())
			.then(response => {
				console.log(`Success Response:${JSON.stringify(response)}`);
				if (response.i_result === 1) {
					// return true && response.a_data.s_session_id;
					return true;
				}
				return false;
			})
			.catch(error => {
				console.log(`Error ${error}`);
				return false;
			});
	};
	// dispatch({
	// 	type: APP_SET_LANGUAGE,
	// 	payload: newLanguage
	// });
};

// Is app running first time?
export const appRunningFirstTime = () => dispatch =>
	new Promise((resolve, reject) =>
		RetrieveItem("DID_APP_RUN_BEFORE")
			.then(status => {
				console.log(`%c APP_RUNNING_FIRST_TIME STATUS from STORAGE ${status}`, "background:red;color:white");
				// console.log(status === true);

				if (status !== ("" || null)) {
					dispatch({ type: APP_IS_NOT_RUNNING_FIRST_TIME });
					return resolve(status);
				}
				dispatch({ type: APP_IS_RUNNING_FIRST_TIME });
				return resolve(status);
			})
			.catch(error => {
				//  Handle errors for Redux
				dispatch({ type: APP_IS_RUNNING_FIRST_TIME });
				reject(error);
				return false;
			})
	);
/**
 *   @description checking and verifying “remember me and keychain and async data”
 *   Basic idea is that lets spilt this into 2 parts
 *   1 - lets check for async data which is for mainly to check "skipIntro" key.
 *   if skip intro is done, the go to Auth bucket
 *
 *   2 - in Auth bucket we will decide if the login info exists, if exists
 *   then we will attempt to refresh session and then proceed proceed to Preprofile
 *   in case of fail, we should you Login/Auth screen.
 */

export const AppInitVerifier = () => async dispatch => {
	dispatch({ type: APP_INIT_VALIDATOR_STARTED });
	await dispatch(appRunningFirstTime()).then(
		status => {
			console.log(`return of appRunningFirstTime() is ${status}`);
			dispatch({ type: "APP_INIT_FIRST_TIME_VALIDATOR_FINISHED" });
		},
		error => {
			console.log(error);
			dispatch({ type: "APP_INIT_VALIDATOR_FINISHED_WITH_ERROR" });
		}
	);
	/* dispatch({ type: "APP_INIT_LANGUAGE_VALIDATOR_STARTING" });
	await dispatch(AppLangVerifier()).then(
		status => {
			console.log(`return of AppLangVerifier() is ${status}`);
			dispatch({ type: "APP_INIT_LANGUAGE_VALIDATOR_FINISHED" });
		},
		error => {
			console.log(error);
			dispatch({
				type: "APP_INIT_LANGUAGE_VALIDATOR_FINISHED_WITH_ERROR"
			});
		}
	); */
	dispatch({ type: APP_INIT_VALIDATOR_FINISHED });
};
/*
 * if session was successfully refreshed then
 * we should refresh the pre-profile array as well
 */

/*
 * @desc call to submit user and password for new token
 */
export const CallToRefreshSession = (username, password) => dispatch =>
	new Promise((resolve, reject) => {
		// console.log(`%c Starting CallToRefreshSession`, "background:purple;color:white");
		dispatch({ type: REFRESHING_SESSION_ID_STARTED });
		dispatch(loginCustomer(username, password)).then(
			status => {
				// console.log(`%c status ${status}`, "background: gold; color: white");
				if (status) {
					// dispatch({ type: REFRESHING_SESSION_ID_SUCCESS });
					return resolve(true);
				}
				// dispatch({ type: REFRESHING_SESSION_ID_FAILED });
				return resolve(false);
			},
			error => {
				//  Handle errors for Redux
				// console.log("network error i think", error);
				// dispatch({ type: REFRESHING_SESSION_ID_FAILED });
				return reject(false); // eslint-disable-line prefer-promise-reject-errors
			}
		);
		// .catch(error => {
		// 	//  Handle errors for Redux
		// 	dispatch({ type: REFRESHING_SESSION_ID_FAILED });
		// 	reject(error);
		// });
	});
/**
 * @desc  Orchestrating Call For Internet usage history of TODAY
 *  First Calling Keychain to get session
 *  Second Validating
 *  After validation if success then Dispatching the AccountDetailsCall()
 *  @see AccountDetailsCall
 * @return {Promise<Resolve, Reject>}
 */
export const AppSessionVerifierCall = () => async dispatch => {
	// console.log(`AppSessionVerifierCall is being called`);
	dispatch({ type: APP_SESSION_VALIDATOR_STARTED });

	const SelectedAccount = await RetrieveItem("SelectedAccount"); // pre-check
	// console.log(String(SelectedAccount));
	if (String(SelectedAccount).length > 5) {
		const credentialStatus = await KeychainCredentialStatus();
		// console.log("%c credentialStatus ", "background:purple;color:white");
		// console.log(credentialStatus);
		// console.log(typeof credentialStatus, Object.keys(credentialStatus).length);
		/*
		 * @desc If credentials Check is true, that means we have credentials
		 * and we should regenerate the session Token
		 * @see CallToRefreshSession helper function
		 */
		if (Object.keys(credentialStatus).length > 1 && String(credentialStatus.password).length > 1) {
			dispatch({ type: APP_HAS_LOGIN_CREDENTIALS });
			return dispatch(CallToRefreshSession(credentialStatus.username, credentialStatus.password)).then(
				loginStatus => {
					handleRemoteValidateResponse(loginStatus);
					if (loginStatus) {
						dispatch({ type: APP_SESSION_VALIDATOR_SUCCESS });

						dispatch({ type: REFRESHING_SESSION_ID_SUCCESS });
						// return dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
						// return true;
						dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });

						if (String(SelectedAccount).length > 5) {
							/*
							 *   Before going to Home screen we need to refresh the list of Accounts
							 *   i.e all profiles related to User
							 *   Lastly get the total count of profiles
							 */
							dispatch(SelectProfileCallV2());
							// return Navigation.setStackRoot("Netcity.WelcomeScreen", [ // Component1
							HomeStack();
						}
						return true;
						// return AppSessionVerifierFinishingCall();
						// return Promise.all(
						// 	getSessionFromKeychain().then(KeyChainSessionStr => {
						// 		console.log(JSON.stringify(KeyChainSessionStr));
						// 	})
						// );
					}
					dispatch({ type: APP_SESSION_VALIDATOR_FAILED });
					dispatch({ type: REFRESHING_SESSION_ID_FAILED });
					dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
					return false;
				},
				error => {
					//  Handle errors for Redux
					console.log(`possible internet error${error}`);
					dispatch({ type: REFRESHING_SESSION_ID_FAILED });
					dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
					return false;
				}
			);
		}
	}
	dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
	dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
	return false;
};

export const appSessionLoaderFalse = () => dispatch => {
	dispatch({ type: APP_SESSION_VALIDATOR_LOADER_RESET });
};

//
//
//
// DELETE BELOW
//
//
//
export const AppSessionVerifier = () => dispatch =>
	new Promise((resolve, reject) =>
		// dispatch({ type: APP_SESSION_VALIDATOR_STARTED });
		// Before checking Credentials, we should if there's any internet
		// connection is available. otherwise no need to check for credentials etc.

		// check credentials for Keychain
		LoadKeyChain().then(
			loadedCredentials => {
				console.log(`%c LoadKeyChain from STORAGE`, "background:red;color:white");
				console.log(loadedCredentials);
				/* @desc loadedCredentials.username Returns OBJECT
				 * so, now we need to understand that if credentials are not ZERO or undefined etc
				 */
				if (
					String(loadedCredentials.username) !== 0 &&
					String(loadedCredentials.username) !== "null" &&
					String(loadedCredentials.username) !== "undefined" &&
					String(loadedCredentials.password) !== 0 &&
					String(loadedCredentials.password) !== "null" &&
					String(loadedCredentials.password) !== "undefined"
				) {
					dispatch({ type: APP_HAS_LOGIN_CREDENTIALS });
					/*
					 *   everything looks positive so far we can go to next Screen
					 *   But we NEED TO REFRESH session id first
					 *   @see CallToRefreshSession helper function
					 */
					return dispatch(CallToRefreshSession(loadedCredentials.username, loadedCredentials.password)).then(finalStatus => {
						console.log(`FinalStatus ${finalStatus}`);
						// If final status is true then we can go to next screen 100%
						if (finalStatus) {
							dispatch({
								type: APP_SESSION_VALIDATOR_SUCCESS,
							});
							// return dispatch({
							// 	type: APP_SESSION_VALIDATOR_FINISHED
							// });
							return true;
						}
						dispatch({
							type: APP_SESSION_VALIDATOR_FAILED,
						});
						// return dispatch({
						// 	type: APP_SESSION_VALIDATOR_FINISHED
						// });
						return false;
					});
				}
				dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
				// dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });

				resolve(loadedCredentials);
			},
			error => {
				//  Handle errors for Redux
				dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
				// dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
				reject(error);
			}
		)
	);
