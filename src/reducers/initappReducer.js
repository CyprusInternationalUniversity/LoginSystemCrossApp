// types
import {
	APP_SET_LANGUAGE,
	APP_DEVICE_LANG_DETECT,
	APP_DEVICE_LANG_DETECT_SUCCESS,
	APP_DEVICE_LANG_DETECT_FAIL,
	APP_INIT_VALIDATOR_FINISHED,
	APP_IS_NOT_RUNNING_FIRST_TIME,
	APP_IS_RUNNING_FIRST_TIME,
	APP_SESSION_VALIDATOR_STARTED,
	APP_SESSION_VALIDATOR_SUCCESS,
	APP_HAS_LOGIN_CREDENTIALS,
	APP_SESSION_VALIDATOR_FAILED,
	APP_SESSION_VALIDATOR_FINISHED,
	APP_SESSION_VALIDATOR_LOADER_RESET,
	APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR,
	REFRESHING_SESSION_ID_STARTED,
	APP_DOES_NOT_HAS_LOGIN_CREDENTIALS,
} from "../actions/types";

// initial states
const initialState = {
	// step 1
	appLoading: null,
	appRunningFirstTime: null,
	globalCurrentLocal: null, // can define Default Language
	// step 2
	appSessionLoader: null,
	appSessionLoadingMsg: false,
	refreshingSessionCompleted: false,
};

// switch cases
export default (state = initialState, action) => {
	switch (action.type) {
		// on opening check language
		case APP_DEVICE_LANG_DETECT:
			return { ...state };
		case APP_DEVICE_LANG_DETECT_SUCCESS:
			return { ...state, app_save_lang: action.payload };
		case APP_DEVICE_LANG_DETECT_FAIL:
			return { ...state, app_save_lang: action.payload };
		// on Opening app
		case APP_IS_NOT_RUNNING_FIRST_TIME:
			return { ...state, appRunningFirstTime: false };
		case APP_IS_RUNNING_FIRST_TIME:
			return { ...state, appRunningFirstTime: true };
		case APP_INIT_VALIDATOR_FINISHED:
			return {
				...state,
				appLoading: false,
			};
		// if language is changed
		case APP_SET_LANGUAGE:
			return {
				...state,
				globalCurrentLocal: action.payload,
			};
		// if login-in before then we will refresh session automatically
		case APP_SESSION_VALIDATOR_STARTED:
			return {
				...state,
				appSessionLoader: true,
				appSessionLoadingMsg: "loading",
			};
		case APP_HAS_LOGIN_CREDENTIALS:
			return {
				...state,
				appSessionLoadingMsg: "foundCredentials",
			};
		case REFRESHING_SESSION_ID_STARTED:
			return {
				...state,
				appSessionLoadingMsg: "refreshingSession",
			};
		case APP_SESSION_VALIDATOR_SUCCESS:
			return {
				...state,
				appSessionLoadingMsg: "refreshingSessionSuccess",
			};
		case APP_DOES_NOT_HAS_LOGIN_CREDENTIALS:
			return {
				...state,
				appSessionLoader: null,
				appSessionLoadingMsg: "noCredentialsFound",
			};
		case APP_SESSION_VALIDATOR_FAILED:
			return {
				...state,
				appSessionLoader: null,
				appSessionLoadingMsg: "refreshingSessionFailed",
			};
		case APP_SESSION_VALIDATOR_FINISHED:
			return {
				...state,
				refreshProfiles: true,
				// appSessionLoader: null,
				appSessionLoadingMsg: "finishLoading",
			};
		case APP_SESSION_VALIDATOR_LOADER_RESET:
			return {
				...state,
				appSessionLoader: null,
			};
		case APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR:
			return {
				...state,
				appSessionLoader: null,
			};

		default:
			return state;
	}
};
