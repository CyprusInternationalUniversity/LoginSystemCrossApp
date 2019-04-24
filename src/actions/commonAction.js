import { SESSION_EXPIRED_RESET_STORE } from "./types";
import { LoadKeyChain, SaveKeyChain, GetKeyChainUserID, GetKeyChainSessionID } from "../util/keychain";
// import { API_BASE_URL, CHECK_SESSION_ENDPOINT, ApiUtils } from "../api";

/*
 * @desc return session obj
 */
export const getSessionFromKeychain = async () => {
	try {
		return {
			access_token: await GetKeyChainSessionID(),
		};
	} catch (error) {
		return error;
	}
};

/*
 * @desc return session obj
 */
export const getUserIdFromKeychain = async () => {
	try {
		return await GetKeyChainUserID();
	} catch (error) {
		return error;
	}
};
// save new password in keychain
export const setNewPasswordToKeychain = async newPassword => {
	try {
		const existingCredentials = await LoadKeyChain();
		// save new password with exisiting credentials
		return await SaveKeyChain(
			existingCredentials.username,
			newPassword,
			existingCredentials.sessionID,
			existingCredentials.userID
		);
	} catch (error) {
		return error;
	}
};
/**
 *  @summary Call For Resetting store
 *  $helperFunction
 */
export const SessionExpireResetStore = () => dispatch => {
	dispatch({ type: SESSION_EXPIRED_RESET_STORE });
};
