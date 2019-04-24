// keychain library
// import * as Keychain from "react-native-keychain";
import { SecureStore } from "expo";
/**
 * util function of saving,loading and resting keychain credentials
 */

export const SaveKeyChain = async (username, password, sessionID, userID) => {
	// const username = "Danish";
	// const password = "poniesRgr8";
	try {
		await SecureStore.setItemAsync(
			"GenericPassword",
			JSON.stringify({
				username,
				password,
				sessionID,
				userID,
			})
		);
		// console.log("%c save credentials!", "background: blue; color: white");
	} catch (err) {
		// console.log("%c Could not save credentials!", "background: red; color: white");
		// console.log(err);
	}
};

export const LoadKeyChain = async () => {
	try {
		// console.log("called LoadKeyChain");
		const credentials = await SecureStore.getItemAsync("GenericPassword");
		if (credentials) {
			// console.log("%c Credentials loaded!", "background: blue; color: white");
			const parsedCredentials = JSON.parse(credentials);
			// console.log(credentials);
			// console.log(`ACCOUNT ID: ${credentials.username}`);
			// console.log(`PASSWORD: ${preparePass.password}`);
			// console.log(`SESSION ID: ${preparePass.sessionID}`);
			// console.log(credentials.sessionID);
			return {
				username: parsedCredentials.username,
				password: parsedCredentials.password,
				sessionID: parsedCredentials.sessionID,
				userID: parsedCredentials.userID,
			};
		}
		// console.log("%c credentials are EMPTY!", "background: blue; color: white");
		return {
			username: 0,
			password: 0,
		};
	} catch (err) {
		// console.log("%c Could not load credentials!", "background: blue; color: white");
		// console.log(err);
		this.ResetKeyChain();
	}
	return false;
};

export const GetKeyChainSessionID = async () => {
	try {
		const credentials = await SecureStore.getItemAsync("GenericPassword");

		if (credentials) {
			const parsedCredentials = JSON.parse(credentials);

			// console.log("%c Session ID from Keychain!", "background: blue; color: white");
			// console.log(preparePass);

			return parsedCredentials.sessionID;
		}
		// console.log("%c No credentials Loaded!", "background: blue; color: white");
		return false;
	} catch (err) {
		// console.log("%c Could not load credentials!", "background: blue; color: white");
		// console.log(err);
		return false;
	}
};

export const GetKeyChainUserID = async () => {
	try {
		const credentials = await SecureStore.getItemAsync("GenericPassword");

		if (credentials) {
			const parsedCredentials = JSON.parse(credentials);
			return parsedCredentials.userID;
		}
		return false;
	} catch (err) {
		return false;
	}
};

export const GetKeyChainEmail = async () => {
	try {
		const credentials = await SecureStore.getItemAsync("GenericPassword");

		if (credentials) {
			const parsedCredentials = JSON.parse(credentials);
			return parsedCredentials.username;
		}
		return false;
	} catch (err) {
		return false;
	}
};

export const DeleteKeyChainItem = async key => {
	try {
		// console.log(`%c removing item ${key}`, "background: green;color:white");
		return await SecureStore.deleteItemAsync(key);
	} catch (error) {
		// Error retrieving data
		// console.log(error.message);
	}
	return false;
};

/* export const ResetKeyChain = async () => {
	try {
		const credentials = await Keychain.resetGenericPassword();
		console.log("%c Credentials Reset!", "background: red; color: white");
		console.log(credentials);
		console.log(credentials.username);
		console.log(credentials.password);
		return true;
		// console.log(credentials.sessionID);
	} catch (err) {
		console.log("%c Could not Reset credentials!", "background: blue; color: white");
		console.log(err);
		// even there's a error. we will just continue because we are chaining
		// with .then on settings for logout
		return true;
		// return false;
	}
}; */
