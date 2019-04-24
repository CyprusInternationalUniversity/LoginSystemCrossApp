import { Toast } from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { map as fuckingMap } from "p-iteration";
import { stringify } from "query-string";
import { getSessionFromKeychain, getUserIdFromKeychain } from "./commonAction";
import {
	// get customer address
	GET_CUSTOMERS_ADDRESSES,
	GET_CUSTOMERS_ADDRESSES_SUCCESS,
	GET_CUSTOMERS_ADDRESSES_FAIL,
	// post customer address
	POST_CUSTOMERS_ADDRESS,
	POST_CUSTOMERS_ADDRESS_SUCCESS,
	POST_CUSTOMERS_ADDRESS_FAIL,
	// get cities only
	GET_CITIES,
	GET_CITIES_SUCCESS,
	GET_CITIES_FAIL,
	// get region by City ID
	GET_SINGLE_REGIONS,
	GET_SINGLE_REGIONS_SUCCESS,
	GET_SINGLE_REGIONS_FAIL,
	// cities and regions
	GET_CITIES_REGIONS,
	GET_CITIES_REGIONS_SUCCESS,
	GET_CITIES_REGIONS_FAIL,
	// categoies
	GET_RESTAURANTS_BY_CATEGORY,
	GET_RESTAURANTS_BY_CATEGORY_SUCCESS,
	GET_RESTAURANTS_BY_CATEGORY_FAIL,
	GET_SINGLE_RESTAURANT,
	GET_SINGLE_RESTAURANT_SUCCESS,
	GET_SINGLE_RESTAURANT_FAIL,
	GET_CATEGORIES,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAIL,
} from "./types";
import {
	API_BASE_URL,
	GET_ALL_CUSTOMERS_ADDRESS_EP,
	// GET_CUSTOMERS_EP,
	POST_CUSTOMERS_EP,
	// GET_CUSTOMERS_ADDRESS_EP,
	POST_CUSTOMERS_ADDRESS_EP,
	GET_CITIES_EP,
	GET_REGIONS_EP,
	GET_CATEGORIES_EP,
	GET_RESTAURANTS_EP,
	GET_RESTAURANT_EP,
} from "../static/apiConstants";

// get cities Only
export const getCustomerAddresses = () => async dispatch => {
	dispatch({ type: GET_CUSTOMERS_ADDRESSES });
	const customerId = await getUserIdFromKeychain();
	const URL = `${API_BASE_URL}${GET_ALL_CUSTOMERS_ADDRESS_EP}?customerId=${customerId}
	&${stringify(await getSessionFromKeychain())}`;

	return axios
		.get(URL)
		.then(response => {
			// console.log(response);
			return dispatch({
				type: GET_CUSTOMERS_ADDRESSES_SUCCESS,
				payload: response.data,
			});
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
			console.log(message);
			// return dispatch({ type: REGISTRATION_FAIL });
			Toast.show({
				text: "Error loading Addresses. Please try again",
				buttonText: "Okay",
				duration: 1800,
				type: "danger",
			});
			return dispatch({
				type: GET_CUSTOMERS_ADDRESSES_FAIL,
				payload: {
					message,
					status: output.response.status,
				},
			});
		});
};

// post/ add address of customer
export const postCustomerAddress = addressObj => async dispatch => {
	const customerId = await getUserIdFromKeychain();
	const PostObj = {
		...addressObj,
		customerId,
	};
	console.log(PostObj);
	const URL = `${API_BASE_URL}${POST_CUSTOMERS_EP}/${customerId}/${POST_CUSTOMERS_ADDRESS_EP}?${stringify(
		await getSessionFromKeychain()
	)}`;
	dispatch({ type: POST_CUSTOMERS_ADDRESS });
	return axios
		.post(URL, PostObj)
		.then(response => {
			// console.log(response);
			Toast.show({
				text: "Address was created sucessfully.",
				buttonText: "Okay",
				duration: 1800,
				type: "success",
			});
			dispatch({
				type: POST_CUSTOMERS_ADDRESS_SUCCESS,
				payload: response.data,
			});
			return Actions.drawer();
		})
		.catch(error => {
			const output = JSON.parse(JSON.stringify(error));
			console.log(output);
			let message = "";
			if (output.response) {
				message = output.response.data.message ? output.response.data.message : output.response.status;
			} else {
				message = "Connection refused, please check the server";
			}
			console.log(message);
			// return dispatch({ type: REGISTRATION_FAIL });
			Toast.show({
				text: "Error creating address. Please try again",
				buttonText: "Okay",
				duration: 1800,
				type: "danger",
			});
			return dispatch({
				type: POST_CUSTOMERS_ADDRESS_FAIL,
				payload: {
					message,
					status: output.response.status,
				},
			});
		});
};

// get cities Only
export const getCities = () => async dispatch => {
	dispatch({ type: GET_CITIES });

	return axios
		.get(`${API_BASE_URL}${GET_CITIES_EP}?${stringify(await getSessionFromKeychain())}`)
		.then(response => {
			// console.log(response);

			return dispatch({
				type: GET_CITIES_SUCCESS,
				payload: response.data,
			});
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
			console.log(message);
			// return dispatch({ type: REGISTRATION_FAIL });
			Toast.show({
				text: "Error loading Cities. Please try again",
				buttonText: "Okay",
				duration: 1800,
				type: "danger",
			});
			return dispatch({
				type: GET_CITIES_FAIL,
				payload: {
					message,
					status: output.response.status,
				},
			});
		});
};
// get regions Only by city id
// get single Region by id
export const getRegionByCityId = cityId => async dispatch => {
	dispatch({ type: GET_SINGLE_REGIONS });

	return axios
		.get(`${API_BASE_URL}${GET_CITIES_EP}/${cityId}/${GET_REGIONS_EP}?${stringify(await getSessionFromKeychain())}`)
		.then(response => {
			// console.log(response);

			return dispatch({
				type: GET_SINGLE_REGIONS_SUCCESS,
				payload: response.data,
			});
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
			console.log(message);
			// return dispatch({ type: REGISTRATION_FAIL });
			Toast.show({
				text: "Error loading Regions. Please try again",
				buttonText: "Okay",
				duration: 1800,
				type: "danger",
			});
			return dispatch({
				type: GET_SINGLE_REGIONS_FAIL,
				payload: {
					message,
					status: output.response.status,
				},
			});
		});
};
// get all cities and Regions
export const getCitiesRegions = () => async dispatch => {
	dispatch({ type: GET_CITIES_REGIONS });

	return axios
		.get(`${API_BASE_URL}${GET_CITIES_EP}?${stringify(await getSessionFromKeychain())}`)
		.then(response => {
			// console.log(response);
			const CitiesNames = new Map();
			const CitiesIds = response.data.map(city => {
				CitiesNames.set(city.id, city.name);
				return city.id;
			});
			const prepareCityAndRegions = fuckingMap(CitiesIds, async cityId => {
				return axios
					.get(`${API_BASE_URL}${GET_CITIES_EP}/${cityId}/${GET_REGIONS_EP}?${stringify(await getSessionFromKeychain())}`)
					.then(response2nd => {
						return {
							name: CitiesNames.get(cityId),
							id: cityId,
							regions: response2nd.data,
						};
					})
					.catch(error => {
						console.log(`ERROR ${error}`);
						return error;
					});
			});
			prepareCityAndRegions.then(items => {
				// console.log(items);
				return dispatch({
					type: GET_CITIES_REGIONS_SUCCESS,
					payload: items,
				});
			});
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
			console.log(message);
			// return dispatch({ type: REGISTRATION_FAIL });
			Toast.show({
				text: "Error loading Cities and Regions. Please try again",
				buttonText: "Okay",
				duration: 1800,
				type: "danger",
			});
			return dispatch({
				type: GET_CITIES_REGIONS_FAIL,
				payload: {
					message,
					status: output.response.status,
				},
			});
		});
};

export const resetRegions = () => {
	return dispatch => {
		dispatch({ type: "RESET_REGIONS" });
	};
};
// Get Categories
export const getCategories = () => async dispatch => {
	dispatch({ type: GET_CATEGORIES });

	return (
		axios
			.get(`${API_BASE_URL}${GET_CATEGORIES_EP}?${stringify(await getSessionFromKeychain())}`)
			// API.RegisterProcess(credentials)
			.then(response => {
				// console.log(response);

				return dispatch({
					type: GET_CATEGORIES_SUCCESS,
					payload: response.data,
				});
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
				console.log(message);
				// return dispatch({ type: REGISTRATION_FAIL });
				Toast.show({
					text: "Error loading categories. Please try again",
					buttonText: "Okay",
					duration: 1800,
					type: "danger",
				});
				return dispatch({
					type: GET_CATEGORIES_FAIL,
					payload: {
						message,
						status: output.response.status,
					},
				});
			})
	);
};

// Get restaurants by Category ID
export const getRestaurantsByCategory = catId => async dispatch => {
	dispatch({ type: GET_RESTAURANTS_BY_CATEGORY });

	return (
		axios
			.get(`${API_BASE_URL}${GET_CATEGORIES_EP}/${catId}/${GET_RESTAURANT_EP}?${stringify(await getSessionFromKeychain())}`)
			// API.RegisterProcess(credentials)
			.then(response => {
				// console.log(response);

				return dispatch({
					type: GET_RESTAURANTS_BY_CATEGORY_SUCCESS,
					payload: response.data,
				});
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
				console.log(message);
				// return dispatch({ type: REGISTRATION_FAIL });
				Toast.show({
					text: "Error loading Restaurants. Please try again",
					buttonText: "Okay",
					duration: 1800,
					type: "danger",
				});
				return dispatch({
					type: GET_RESTAURANTS_BY_CATEGORY_FAIL,
					payload: {
						message,
						status: output.response.status,
					},
				});
			})
	);
};

// get single restaurant details by restaruant ID
export const getSingleRestaurantById = restId => async dispatch => {
	dispatch({ type: GET_SINGLE_RESTAURANT });

	return (
		axios
			.get(`${API_BASE_URL}${GET_RESTAURANTS_EP}/${restId}?${stringify(await getSessionFromKeychain())}`)
			// API.RegisterProcess(credentials)
			.then(response => {
				// console.log(response);

				return dispatch({
					type: GET_SINGLE_RESTAURANT_SUCCESS,
					payload: response.data,
				});
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
				console.log(message);
				// return dispatch({ type: REGISTRATION_FAIL });
				Toast.show({
					text: "Error loading Restaurant Details. Please try again",
					buttonText: "Okay",
					duration: 1800,
					type: "danger",
				});
				return dispatch({
					type: GET_SINGLE_RESTAURANT_FAIL,
					payload: {
						message,
						status: output.response.status,
					},
				});
			})
	);
};

export const saveRestaurant = restaurant => {
	return dispatch => {
		dispatch({ type: "SAVE_RESTAURANT", payload: restaurant });
	};
};

export const removeSavedRestaurant = restaurant => {
	return dispatch => {
		dispatch({ type: "REMOVE_SAVE_RESTAURANT", payload: restaurant });
	};
};

export const removeAllSavedRestaurant = () => {
	return dispatch => {
		dispatch({ type: "REMOVE_ALL_SAVED_RESTAURANT" });
	};
};
