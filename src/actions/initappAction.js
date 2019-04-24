import { Actions } from "react-native-router-flux";
// typings
import {
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

/**
 *   @description Save "DID_APP_RUN_BEFORE" in AsyncStorage called by Home screen after successsully login
 */
export const AppSetFirstTimeRun = () => async dispatch => {
	dispatch({ type: SET_APP_FIRST_TIME_START });
	await StoreItem("DID_APP_RUN_BEFORE", true);
	dispatch({
		type: SET_APP_FIRST_TIME_SUCCESS,
	});
	dispatch({ type: SET_APP_FIRST_TIME_FINISHED });
};

// Helper func: Is app running first time?
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
		dispatch({ type: REFRESHING_SESSION_ID_STARTED });
		const credentials = {
			email: username,
			password,
		};
		dispatch(loginCustomer(credentials, true)).then(
			status => {
				console.log(`%c loginCustomer status ${status}`, "background: gold; color: white");
				if (status) {
					// dispatch({ type: REFRESHING_SESSION_ID_SUCCESS });
					return resolve(true);
				}
				// dispatch({ type: REFRESHING_SESSION_ID_FAILED });
				return resolve(false);
			},
			error => {
				//  Handle errors for Redux
				console.log("something went wrong", error);
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
	dispatch({ type: APP_SESSION_VALIDATOR_STARTED });

	const credentialStatus = await LoadKeyChain();
	/*
	 * @desc If credentials Check is true, that means we have credentials
	 * and we should regenerate the session Token
	 * @see CallToRefreshSession helper function
	 */
	if (Object.keys(credentialStatus).length > 1 && String(credentialStatus.password).length > 1) {
		dispatch({ type: APP_HAS_LOGIN_CREDENTIALS });
		return dispatch(CallToRefreshSession(credentialStatus.username, credentialStatus.password)).then(
			loginStatus => {
				if (loginStatus) {
					dispatch({ type: APP_SESSION_VALIDATOR_SUCCESS });
					dispatch({ type: REFRESHING_SESSION_ID_SUCCESS });
					dispatch({ type: APP_SESSION_VALIDATOR_FINISHED });
					return Actions.drawer();
				}
				dispatch({ type: APP_SESSION_VALIDATOR_FAILED });
				dispatch({ type: REFRESHING_SESSION_ID_FAILED });
				dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
				return false;
			},
			error => {
				//  Handle errors for Redux
				console.log(`possible internet error = ${error}`);
				dispatch({ type: REFRESHING_SESSION_ID_FAILED });
				dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
				return false;
			}
		);
	}
	dispatch({ type: APP_DOES_NOT_HAS_LOGIN_CREDENTIALS });
	dispatch({ type: APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR });
	return false;
};

export const appSessionLoaderFalse = () => dispatch => {
	dispatch({ type: APP_SESSION_VALIDATOR_LOADER_RESET });
};
