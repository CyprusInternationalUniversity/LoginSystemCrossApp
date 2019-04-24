import React from "react";
import { View, StyleSheet, Image } from "react-native";

const FullLogo = props => {
	const { container, logo } = styles;
	return (
		<View style={container}>
			<View
				style={{
                    height: props.logoHeight || 100,
                    width: props.logoWidth || 100
                }}
			>
                <Image source={ require("../../../assets/ciuLogo.png") } style={logo} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#CCC"
		//width: 100,
		// marginLeft: 20
    },
    logo: {
        flex: 1,
        alignSelf: "stretch",
        width: "100%",
		height: null,
		// width: 200,
        // height: 213
    }
});
export default FullLogo;
