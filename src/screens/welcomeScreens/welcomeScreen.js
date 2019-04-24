import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from "react-native-router-flux";
import { Container, Icon, Button, Content, H1, H2, H3, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import CustomTheme from "../../styles/variables";
import Colors from "../../constants/Colors";
// styles
import { mt20, mb20, colors, wClr, bold } from "../../styles/index.style";
import {AvenirLTStdBlack, AvenirLTStdBook} from "../../styles/font.style";
// button
// import GButton from "../../components/common/Button";
// Template container
import Template2 from "../../components/designTemplates/template2";

export default class WelcomeScreen extends React.Component {
  goToLogin = () => Actions.login();
  goToRegister = () => Actions.register();

  render() {
    return (
      <Template2
				hasLogo
				hasTagLine
				// hasContentShadowBox
				// hasBack
				// HasBackComponent={() => <RouterBackBtn />}
			>
        <StyleProvider style={getTheme(CustomTheme)}>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={styles.container}>
                <View style={[mt20, {flexDirection: "row"}]}>
                  <H2 style={AvenirLTStdBlack}>WELCOME TO THE</H2>
                </View>
                <View style={mb20}>
                  <H2 style={[
                    AvenirLTStdBlack,
                    {
                      color: Colors.primaryAppColor
                    }
                  ]}>Login System App</H2>
                </View>
                <View style={{  width: "100%" }}>
                  <Text style={mb20}>Your are a Second away from awesomeness. Please Login touching "Sign In" button below. Thank you!</Text>
                  <Button iconLeft large block style={styles.buttonStyle} onPress={this.goToLogin}>
                    <Icon name='key-variant' type="MaterialCommunityIcons" style={{left: -10 }} />
                    <Text style={[AvenirLTStdBook, styles.buttonTextStyle, wClr]}>Sign In</Text>
                  </Button>
                  <Button iconLeft bordered large block style={styles.buttonStyle} onPress={this.goToRegister}>
                    <Icon name='page-edit' type="Foundation" style={{left: -10 }} />
                    <Text style={[AvenirLTStdBook, styles.buttonTextStyle]}>Sign Up</Text>
                  </Button>
                </View>
              </View>
            </View>
        </StyleProvider>
      </Template2>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginLeft: 10, 
    borderRadius: 5, 
    marginBottom: 20
  },
  buttonTextStyle: {
    fontSize: 20,
    // fontWeight: "bold"
  }
});
