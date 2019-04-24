import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore, autoRehydrate } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";

import ReduxThunk from "redux-thunk";
import allReducers from "../reducers";

// Creating store and enhancers
const composeEnhancers = composeWithDevTools({
	// Specify here name, actionsBlacklist, actionsCreators and other options
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* const store = compose(
	composeEnhancers(applyMiddleware(ReduxThunk)),
)(createStore)(reducers);

export default store; */


export default function ConfigureStore() {
	const store = createStore(
		allReducers,
		composeEnhancers(applyMiddleware(...[ReduxThunk]))
		// composeEnhancers(applyMiddleware(ReduxThunk))
		// applyMiddleware(ReduxThunk)
	);
	// eslint-disable-next-line
	//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	return store;
}

