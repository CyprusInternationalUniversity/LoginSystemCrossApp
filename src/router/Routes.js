/* eslint-disable no-unused-vars */
import React from "react";
import { Stack, Router, Scene, Drawer, Tabs, ActionConst } from "react-native-router-flux";

// import screens
import WelcomeScreen from "../screens/welcomeScreens/welcomeScreen";
import LoginScreen from "../screens/welcomeScreens/login";
import RegistrationScreen from "../screens/welcomeScreens/registration";

import DrawerContent from "../components/DrawerContent";
import MenuIcon from "../components/MenuIcon";
// import TabBarIcon from "../components/TabBarIcon";
// tab screen
import HomeScreen from "../screens/mainScreens/HomeScreen";
import SettingsScreen from "../screens/mainScreens/SettingsScreen";
// additional screens
import ChangePassword from "../screens/mainScreens/profileHelper/changePassword";

const Routes = () => (
	<Router>
		<Stack key="root" hideNavBar titleStyle={{ alignSelf: "center" }}>
			{/* <Scene key="introslides" component={IntroSlides}  hideNavBar /> */}
			<Scene key="welcomeScreen" component={WelcomeScreen} hideNavBar type={ActionConst.RESET} />
			<Scene key="login" title="Login" component={LoginScreen} />
			<Scene key="register" title="Register" component={RegistrationScreen} hideNavBar={false} />
			<Drawer
				// initial
				hideNavBar
				key="drawer"
				onExit={() => {
					console.log("Drawer closed");
				}}
				onEnter={() => {
					console.log("Drawer opened");
				}}
				contentComponent={DrawerContent}
				drawerIcon={MenuIcon}
				drawerWidth={250}
				type={ActionConst.REPLACE}
			>
				<Scene hideNavBar>
					<Scene key="main_home" component={HomeScreen} title="Home" tabBarLabel="Home" hideNavBar />
					<Scene key="main_settings" component={SettingsScreen} title="Settings" />
					{/* <Scene
						key="main_profile"
						component={ProfileScreen}
						title="Profile"
						tabBarLabel="Profile"
						IconName="user"
						IconType="Entypo"
						icon={TabBarIcon}
					/> */}
					<Scene
						// initial
						key="changePassword"
						component={ChangePassword}
						title="Change Password"
						hideNavBar={false}
						// initial
					/>
				</Scene>
			</Drawer>
		</Stack>
	</Router>
);
export default Routes;
/* eslint-enable no-unused-vars */
