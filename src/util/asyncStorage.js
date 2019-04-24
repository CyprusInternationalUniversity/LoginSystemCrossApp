/**
 * util function of saving,loading and deleting from Async Storage
 */
// Async support from React native
// https://facebook.github.io/react-native/docs/asyncstorage.html
import { AsyncStorage } from "react-native";

export const StoreItem = async (key, item) => {
	try {
		// console.log(`%c storing item with key: ${key} and item: ${item}`, "background: green;color:white");
		// we want to wait for the Promise returned by AsyncStorage.setItem()
		// to be resolved to the actual value before returning the value
		return await AsyncStorage.setItem(key, JSON.stringify(item));
	} catch (error) {
		// console.log(error.message);
		return false;
	}
};

export const RetrieveItem = async key => {
	try {
		// console.log(`%c Retrieve item ${key}`, "background: green;color:white");
		const retrievedItem = await AsyncStorage.getItem(key);
		const item = JSON.parse(retrievedItem);
		return item;
	} catch (error) {
		// console.log(error.message);
		return false;
	}
};
/**
 * @desc Log all keys from Storage
 */
export const logStorage = async () => {
	try {
		// console.log(`%c Logging async storage`, "background: green;color:white");
		const obj = {};
		const keys = await AsyncStorage.getAllKeys();
		const retrievedItem = await AsyncStorage.multiGet(keys).then(result => ({ ...obj, result }));
		// console.log(retrievedItem.result);
		// console.log(JSON.stringify(retrievedItem.result, null, 4));
		// return JSON.stringify(retrievedItem.result, null, 4);
		return retrievedItem.result;
	} catch (error) {
		// console.log(error);
	}
	return false;
};
/**
 * @desc Delete Single key from storage
 */
export const DeleteItem = async key => {
	try {
		// console.log(`%c removing item ${key}`, "background: green;color:white");
		return await AsyncStorage.removeItem(key);
	} catch (error) {
		// Error retrieving data
		// console.log(error.message);
	}
	return false;
};
/**
 * @desc Delete all keys from storage
 * @return empty array []
 */
export const ResetStorage = async () => {
	try {
		await AsyncStorage.clear();
		return true;
	} catch (error) {
		// Error retrieving data
		// console.log(error);
		return false;
	}
};
/*
 *   We need to preserve following keys
 *   1 - DeviceLanguage
 *   2 - APP_RUNNING_FIRST_TIME
 *   in other words we are saving 3 keys so i can delete only 3rd
 *   3rd key: SelectedAccount
 */
export const LogoutResetStorage = async () => {
	try {
		// await AsyncStorage.clear();
		await DeleteItem("SelectedAccount");
		return true;
	} catch (error) {
		// Error retrieving data
		// console.log(error);

		// even there's a error. we will just continue because we are chaining
		// with .then on settings for logout
		return true;
		// return false;
	}
};
