import {
	// get customer addresses
	GET_CUSTOMERS_ADDRESSES,
	GET_CUSTOMERS_ADDRESSES_SUCCESS,
	GET_CUSTOMERS_ADDRESSES_FAIL,
	// get cities only
	GET_CITIES,
	GET_CITIES_SUCCESS,
	GET_CITIES_FAIL,
	// get region by City ID
	GET_SINGLE_REGIONS,
	GET_SINGLE_REGIONS_SUCCESS,
	GET_SINGLE_REGIONS_FAIL,
	GET_CITIES_REGIONS,
	GET_CITIES_REGIONS_SUCCESS,
	GET_CITIES_REGIONS_FAIL,
	GET_RESTAURANTS_BY_CATEGORY,
	GET_RESTAURANTS_BY_CATEGORY_SUCCESS,
	GET_RESTAURANTS_BY_CATEGORY_FAIL,
	GET_SINGLE_RESTAURANT,
	GET_SINGLE_RESTAURANT_SUCCESS,
	GET_SINGLE_RESTAURANT_FAIL,
	GET_CATEGORIES,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAIL,
} from "../../actions/types";

// initial states
const initialState = {
	// customer addresses
	customerAddressesLoader: false,
	customerAddresses: null,
	// cities only
	citiesLoader: false,
	cities: [],
	//  regions by city id
	regionsLoader: false,
	regions: [],
	regionsLoaded: false,
	// get cities with regions
	citiesNRegionsLoader: false,
	citiesNRegions: [],
	// get categories
	catLoader: false,
	categories: [],
	// get restaurants by category ID
	restLoader: false,
	restaurants: [],
	// get single restaurant details
	restSingleLoader: false,
	restaurantSingle: [],

	savedRestaurants: [],
	savedRestaurantsToRemove: [],

	address: [],
	addressToRemove: [],
};

const GeneralReducer = (state = initialState, action) => {
	switch (action.type) {
		// cities only
		// get city with regions
		case GET_CUSTOMERS_ADDRESSES:
			return { ...state, customerAddressesLoader: true };
		case GET_CUSTOMERS_ADDRESSES_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				customerAddressesLoader: false,
				customerAddresses: action.payload,
			};
		case GET_CUSTOMERS_ADDRESSES_FAIL:
			return {
				...state,
				customerAddressesLoader: false,
			};
		// get city with regions
		case GET_CITIES:
			return { ...state, citiesLoader: true };
		case GET_CITIES_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				citiesLoader: false,
				cities: action.payload,
			};
		case GET_CITIES_FAIL:
			return {
				...state,
				citiesLoader: false,
			};
		// single regions only
		// get city with regions
		case GET_SINGLE_REGIONS:
			return { ...state, regionsLoader: true, regionsLoaded: false };
		case GET_SINGLE_REGIONS_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				regionsLoader: false,
				regions: action.payload,
				regionsLoaded: true,
			};
		case GET_SINGLE_REGIONS_FAIL:
			return {
				...state,
				regionsLoader: false,
				regionsLoaded: false,
			};
		case "RESET_REGIONS":
			return {
				...state,
				regionsLoader: false,
				regions: "",
				regionsLoaded: true,
			};
		// get city with regions
		case GET_CITIES_REGIONS:
			return { ...state, citiesNRegionsLoader: true };
		case GET_CITIES_REGIONS_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				citiesNRegionsLoader: false,
				citiesNRegions: action.payload,
			};
		case GET_CITIES_REGIONS_FAIL:
			return {
				...state,
				citiesNRegionsLoader: false,
			};
		// get categories
		case GET_CATEGORIES:
			return { ...state, catLoader: true };
		case GET_CATEGORIES_SUCCESS:
			return {
				...state,
				catLoader: false,
				categories: action.payload,
			};
		case GET_CATEGORIES_FAIL:
			return {
				...state,
				catLoader: false,
			};
		case GET_RESTAURANTS_BY_CATEGORY:
			return { ...state, restLoader: true };
		case GET_RESTAURANTS_BY_CATEGORY_SUCCESS:
			return {
				...state,
				restLoader: false,
				restaurants: action.payload,
			};
		case GET_RESTAURANTS_BY_CATEGORY_FAIL:
			return {
				...state,
				restLoader: false,
			};
		case GET_SINGLE_RESTAURANT:
			return { ...state, restSingleLoader: true };
		case GET_SINGLE_RESTAURANT_SUCCESS:
			return {
				...state,
				restSingleLoader: false,
				restaurantSingle: action.payload,
			};
		case GET_SINGLE_RESTAURANT_FAIL:
			return {
				...state,
				restSingleLoader: false,
			};
		// save restaurant
		case "SAVE_RESTAURANT":
			return {
				...state,
				savedRestaurants: [...(state.savedRestaurants || []), action.payload],
			};
		case "REMOVE_SAVE_RESTAURANT":
			return {
				...state,
				savedRestaurants: state.savedRestaurants.filter(address => address.id !== action.payload.id),
				savedRestaurantsToRemove: state.savedRestaurants.filter(item => item.id === action.payload.id), // test only
			};
		case "REMOVE_ALL_SAVED_RESTAURANT":
			return {
				...state,
				savedRestaurants: [],
			};
		// address
		case "ADDRESS_TO_ADD":
			return {
				...state,
				address: [...(state.address || []), action.payload],
			};
		case "ADDRESS_TO_REMOVE":
			return {
				...state,
				address: state.address.filter(address => address.id !== action.payload.id),
				addressToRemove: state.address.filter(item => item.id === action.payload.id), // test only
			};
		case "DELETE_ALL_ADDRESSES":
			return initialState;
		default:
			return state;
	}
};

export default GeneralReducer;
