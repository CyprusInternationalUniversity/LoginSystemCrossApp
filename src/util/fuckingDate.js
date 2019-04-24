// https://github.com/facebook/react-native/issues/15819#issuecomment-369976505
export const jsCoreDateCreator = dateString => {
	// dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
	const dateParam = dateString.split(/[\s-:]/);
	dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
	return new Date(...dateParam);
};
