export const addItemToCart = product => {
	return dispatch => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};
};

export const removeItemFromCart = product => {
	return dispatch => {
		dispatch({ type: "REMOVE_FROM_CART", payload: product });
	};
};

export const OrderApprovedFromCart = () => {
	return dispatch => {
		dispatch({ type: "ORDER_APPROVED_FROM_CART" });
	};
};

export const resetCart = () => {
	return dispatch => {
		dispatch({ type: "RESET_CART" });
	};
};
