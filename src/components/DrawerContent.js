import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Image } from 'react-native';
import Button from 'react-native-button';
import {H2} from "native-base";
import { Actions } from 'react-native-router-flux';
import {AvenirLTStdBlack} from "../styles/font.style";
import Colors from "../constants/Colors";
import FullLogo from "../components/common/FullLogo";

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  logOut = () => {
    return Actions.welcomeScreen();
  }

  render() {
    return (
      <View style={styles.container}>
        <FullLogo logoHeight={100} logoWidth={100} />
        <View style={{justifyContent: "flex-start", alignItems: "flex-start", paddingTop: 20}}>
          <Button style={styles.menuButton} onPress={Actions.main_home}>Home</Button>
          <Button style={styles.menuButton} onPress={Actions.main_settings}>Settings</Button>
          <Button style={styles.menuButton} onPress={Actions.main_profile}>Profile</Button>
          <Button style={styles.menuButton} onPress={this.logOut}>Sign Out</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  menuButton: {
    fontSize: 22,
    paddingVertical: 10
  }
});

export default DrawerContent;