// initial states
const initialState = {
	cartItemRestaurantName: null,
	cartItem: [],
	cartItemsApproved: [], // order is done copy catItems here
	cartTotal: 0,
	cartItemToRemove: [],
};

const cartItems = (state = [], action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			// return { ...state, cartItem: action.payload };
			return {
				...state,
				cartItemRestaurantName: action.payload.restaurantName,
				cartItem: [...(state.cartItem || []), action.payload],
				// cartTotal: state.cartItem.length >= 1 ? state.cartItem.map((item,i) => state.cartItem + item.price) : null
				// cartTotal: state.cartItem.map((item,i) =>  item.price)
				// cartItem: [action.payload]
			};
		case "REMOVE_FROM_CART":
			return {
				...state,
				cartItem: state.cartItem.filter(cartItem => cartItem.id !== action.payload.id),
				cartItemToRemove: state.cartItem.filter(item => item.id === action.payload.id), // test only
			};
		case "ORDER_APPROVED_FROM_CART":
			return {
				...state,
				cartItemsApproved: state.cartItem,
				cartItem: [],
			};
		case "RESET_CART":
			return initialState;
		default:
			return state;
	}
};

export default cartItems;
