/* eslint-disable no-unused-vars */
import React from "react";
import { Lightbox, Modal, Overlay, Stack, Router, Scene, Drawer, Tabs, ActionConst } from "react-native-router-flux";

// import screens
import WelcomeScreen from "../screens/welcomeScreens/welcomeScreen";
import LoginScreen from "../screens/welcomeScreens/login";
import RegistrationScreen from "../screens/welcomeScreens/registration";
import DrawerContent from "../components/DrawerContent";
import MenuIcon from "../components/MenuIcon";
import TabBarIcon from "../../components/TabBarIcon";
import HomeScreen from "../screens/mainScreens/Home";
import RestrauantByLocationLightBox from "../screens/mainScreens/homeHelper/restarantByLocationLightbox";
import AddAddress from "../screens/mainScreens/homeHelper/addAddress";
import MyAddresses from "../screens/innerScreens/myAddress";
import SelectAddress from "../screens/mainScreens/cartHelper/selectAddress";
import CompleteOrder from "../screens/mainScreens/cartHelper/completeOrder";
import BasketSummary from "../screens/mainScreens/cartHelper/basketSummary";
import DiscoverScreen from "../screens/mainScreens/discover";
import RestaurantListScreen from "../screens/innerScreens/restaurantList";
import RestaurantViewScreen from "../screens/innerScreens/restaurantView";
import FoodConfirmationScreen from "../screens/innerScreens/foodConfirm";
import PreviousOrderScreen from "../screens/innerScreens/previousOrder";
import OrderDetailsScreen from "../screens/innerScreens/orderDetails";
import DealsCampaignsScreen from "../screens/innerScreens/dealsCampaigns";
import ProfileScreen from "../screens/mainScreens/profile";
import ChangePassword from "../screens/mainScreens/profileHelper/changePassword";
import CartScreen from "../screens/mainScreens/cart";
import SettingsScreen from "../screens/innerScreens/settings/SettingsScreen";
import SavedRestaurants from "../screens/innerScreens/savedRestaurant";
import Help from "../screens/innerScreens/help";

const Routes = () => (
	<Router>
		<Lightbox key="lightbox">
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
						<Tabs
							key="tabbar"
							backToInitial
							onTabOnPress={() => {
								console.log("Back to initial and also print this");
							}}
							swipeEnabled
							// tabBarStyle={styles.tabBarStyle}
							// activeBackgroundColor="white"
							// inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
						>
							<Scene
								key="main_home"
								component={HomeScreen}
								title="Home"
								tabBarLabel="Home"
								IconName="home"
								IconType="Entypo"
								icon={TabBarIcon}
								hideNavBar
							/>
							<Scene
								key="main_discover"
								component={DiscoverScreen}
								title="Discover"
								tabBarLabel="Discover"
								IconName="silverware-fork-knife"
								IconType="MaterialCommunityIcons"
								icon={TabBarIcon}
								hideNavBar
							/>
							<Scene
								key="main_cart"
								component={CartScreen}
								title="Basket"
								tabBarLabel="Basket"
								IconName="shopping-basket"
								IconType="FontAwesome"
								icon={TabBarIcon}
							/>
							<Scene
								key="main_profile"
								component={ProfileScreen}
								title="Profile"
								tabBarLabel="Profile"
								IconName="user"
								IconType="Entypo"
								icon={TabBarIcon}
							/>
						</Tabs>
						<Scene
							// initial
							key="changePassword"
							component={ChangePassword}
							title="Change Password"
							hideNavBar={false}
							// initial
						/>
						<Scene key="helpScreen" component={Help} title="Help" hideNavBar={false} />
						<Scene
							// initial
							key="addAddress"
							component={AddAddress}
							title="Add Address"
							hideNavBar={false}
							// initial
						/>
						<Scene
							key="myAddresses"
							component={MyAddresses}
							title="My Addresses"
							hideNavBar={false}
							back
							// initial
						/>
						<Scene
							key="selectAddress"
							component={SelectAddress}
							title="Select Address (1/2)"
							hideNavBar={false}
							back
							// initial
						/>
						<Scene
							key="completeOrder"
							component={CompleteOrder}
							title="Confirm Order (2/2)"
							hideNavBar={false}
							back
							// initial
						/>
						<Scene
							key="basketSummary"
							component={BasketSummary}
							title="Order Summary"
							hideNavBar={false}
							// initial
						/>

						<Scene key="restaurantList" component={RestaurantListScreen} hideNavBar />
						<Scene key="restaurantView" component={RestaurantViewScreen} hideNavBar />
						<Scene key="foodConfirmation" component={FoodConfirmationScreen} hideNavBar />
						<Scene key="previousOrderScreen" component={PreviousOrderScreen} hideNavBar />
						<Scene key="dealsCampaignsScreen" component={DealsCampaignsScreen} hideNavBar />
						<Scene key="orderDetails" component={OrderDetailsScreen} hideNavBar />
						<Scene key="savedRestaurants" component={SavedRestaurants} title="Saved Restaurants" back hideNavBar={false} />
						<Scene
							key="settings"
							component={SettingsScreen}
							title="Settings"
							tabBarLabel="Settings"
							IconName="cog"
							IconType="Entypo"
							icon={TabBarIcon}
						/>
					</Scene>
				</Drawer>
			</Stack>
			<Scene key="demo_lightbox" component={RestrauantByLocationLightBox} />
		</Lightbox>
	</Router>
);
export default Routes;
/* eslint-enable no-unused-vars */
