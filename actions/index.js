import API from "../services/api";

export default {
	LoginProcess: credentials => {
		return dispatch => {
			API.LoginProcess(credentials)
				.then(response => {
					return dispatch({ type: "LOGIN_SUCCESS", payload: response.payload });
				})
				.catch(error => {
					const output = JSON.parse(JSON.stringify(error));
					let message = "";
					if (output.response) {
						message = output.response.data.message ? output.response.data.message : output.response.statusText;
					} else {
						message = "Connection refused, please check the server";
					}
					return dispatch({ type: "LOGIN_ERROR", message });
				});
		};
	},

	Logout: () => {
		return dispatch => {
			return dispatch({ type: "LOGOUT" });
		};
	},
};
