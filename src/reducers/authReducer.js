import { REGISTRATION_SUBMIT, REGISTRATION_SUCCESS, REGISTRATION_FAIL } from "../../actions/types";

// initial states
const initialState = {
	// registeration
	registerationLoader: false,
	registerationMessage: "",
	registerationStatus: null,
	registerationErrorStatus: false,
	registerationsuccessStatus: false,
	// others
	accountID: "",
	password: "",
	loginLoader: false,
	loginuser: null,
	successStatus: false,
	successMsg: "",
	AppSessionID: "",
	errorStatus: false,
	errorMsg: null,
	refreshingSessionCompleted: false,
};

const cartItems = (state = initialState, action) => {
	switch (action.type) {
		case REGISTRATION_SUBMIT:
			return {
				...state,
				registerationLoader: true,
			};

		case REGISTRATION_SUCCESS:
			return {
				...state,
				registerationLoader: false,
				registerationMessage: action.payload.message,
				registerationStatus: action.payload.status,
				registerationErrorStatus: false,
				registerationsuccessStatus: true, // lets go
			};
		case REGISTRATION_FAIL:
			return {
				...state,
				registerationLoader: false,
				registerationMessage: action.payload.message,
				registerationStatus: action.payload.status,
				registerationErrorStatus: true, // bcz there's a error
				registerationsuccessStatus: false,
			};
		default:
			return state;
	}
};

export default cartItems;
