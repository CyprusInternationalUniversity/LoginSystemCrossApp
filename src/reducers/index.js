import { combineReducers } from "redux";
// import routes from "./routesReducer.js";
// // logout type
// import {
// 	LOGOUT_CLEARSTORE,
// 	SESSION_EXPIRED_RESET_STORE
// } from "../actions/types";

// all reducers
// import InitAppReducer from "./initappReducer";
import AuthReducer from "./authReducer";
// import AccountReducer from "./accountReducer";
// import GeneralReducer from "./generalReducer";
// import catItemsReducer from "./catItemsReducer";

const appReducer = combineReducers({
	auth: AuthReducer,
	// general: GeneralReducer,
	// cart: catItemsReducer,
});

// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
/* eslint-disable no-param-reassign */
const rootReducer = (state, action) => {
	console.log(action.type);

	if (
		// action.type === 'RESET' ||
		action.type === "LOGOUT_CLEARSTORE" ||
		action.type === "SESSION_EXPIRED_RESET_STORE"
	) {
		state = undefined;
	}
	return appReducer(state, action);
};
/* eslint-enable no-param-reassign */

export default rootReducer;
