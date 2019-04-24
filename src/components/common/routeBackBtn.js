import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
// styles

const goBack = () => Actions.pop();
// ios-arrow-back
class RouterBackBtn extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={goBack}>
					<View style={{flexDirection: "row", alignItems : "center"}}>
						<Icon
							name="ios-arrow-back"
							type="Ionicons"
							size={30}
							style={{color: this.props.white ? "#FFF" : "#e50000"}}
						/>
						{
							this.props.backTitle ? 
							( <Text style={{color: "#e50000", marginLeft: 5}}>Back</Text> ) 
							: null
						}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default RouterBackBtn;
