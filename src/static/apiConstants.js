// import { withNetworkConnectivity } from "react-native-offline";
// export const withCheckInternet = withNetworkConnectivity({
// 	pingServerUrl: API_BASE_URL,
// });

// bast URL
const SERVER_ADDRESS = "192.168.43.219";
// const SERVER_ADDRESS = "192.168.0.105";
const PORT = "3000";
const API_VERSION = "api";
export const API_BASE_URL = `http://${SERVER_ADDRESS}:${PORT}/${API_VERSION}/`;
// Auth
export const LOGIN_CUSTOMER_EP = "customers/login";
// Customer
export const GET_CUSTOMERS_EP = "customers";
export const POST_CUSTOMERS_EP = "customers";
export const GET_ALL_CUSTOMERS_ADDRESS_EP = "customers/getAllCustomerAddress";
export const CHANGE_CUSTOMER_PASSWORD_EP = "customers/change-password";
export const GET_CUSTOMERS_ADDRESS_EP = "customerAddress";
export const POST_CUSTOMERS_ADDRESS_EP = "customerAddress";
// categories
export const GET_CATEGORIES_EP = "categories";
// Orders
export const GET_CUSTOMER_ORDERS_EP = "orders/getAllOrders";
export const GET_ORDERS_EP = "orders";
export const DELETE_ORDERS_EP = "orders";
// Order details
export const ORDER_DETAILS_RELATION_EP = "orderDetails";
// restaurant
export const GET_RESTAURANT_EP = "restaurant";
export const GET_RESTAURANTS_EP = "restaurants";
// cities
export const GET_CITIES_EP = "cities";
// Regions
export const GET_REGIONS_EP = "regions";

// ApiUtils.js
const ApiUtils = {
	checkStatus(response) {
		if (response.ok) {
			return response;
		}
		const error = new Error(response.statusText);
		error.response = response;
		throw error;
	},
};
export { ApiUtils };
