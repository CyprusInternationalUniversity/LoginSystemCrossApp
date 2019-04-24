import React from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import StarRating from "react-native-star-rating";
import Carousel from "react-native-snap-carousel";
import Modal from "react-native-modal";
import { Container, Header, Content, Icon, Button, H2, Card, CardItem, Body, Left, Right, StyleProvider } from "native-base";
import RouterBackBtn from "../../components/common/routeBackBtn";
import { AvenirLTStdBlack, AvenirLTStdBook, EffraRegular } from "../../styles/font.style";
import { mt10, mt20, mb20, mb10, bold, wClr, colors } from "../../styles/index.style";
import CustomTheme from "../../styles/variables";
import getTheme from "../../../native-base-theme/components";
// redux action
import { saveRestaurant } from "../../actions/generalActions";

const styles = StyleSheet.create({
	bodyContainer: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
	},
	restaurantMenuTitle: {
		fontSize: 20,
	},
	restaurantHeaderTitle: {
		fontSize: 40,
	},
	restaurantHeaderDetails: {
		color: "#9b9999",
		fontSize: 13,
	},
	restaurantHeaderFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: "#CCC",
		borderBottomColor: "#CCC",
		paddingVertical: 10,
	},
	modalContainer: {
		justifyContent: "center",
		alignItems: "center",
		// height: 100,
		padding: 20,
		// flex: 1,
		backgroundColor: "#FFF",
		// justifyContent: "center",
		// alignItems: "center",
	},
	modalContent: {
		justifyContent: "center",
		alignItems: "center",
	},
	modalContentClose: {
		position: "absolute",
		top: 0,
		right: 0,
	},
	menuItemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#CCC",
		paddingVertical: 13,
	},
	slide: {
		paddingHorizontal: 10,
		backgroundColor: "#fff",
	},
	subTitle: {
		color: "#9b9999",
		fontSize: 13,
	},
	restaurantImg: {
		flex: 1,
		alignSelf: "stretch",
		width: "100%",
		height: null,
	},
});
const MenuItem = ({ title, tags, price, event, notAvailable }) => (
	<TouchableOpacity onPress={event}>
		<View style={styles.menuItemContainer}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Icon active name="plus" type="Entypo" style={{ color: notAvailable ? "white" : "green" }} />
				<View style={{ width: "65%", marginLeft: 10 }}>
					<Text style={[EffraRegular, { fontSize: 15, color: notAvailable ? "#CCC" : "#000" }]}>{title}</Text>
					<Text style={[AvenirLTStdBook, { color: notAvailable ? "#CCC" : "#000" }]} numberOfLines={2}>
						{" "}
						{tags}{" "}
					</Text>
				</View>
			</View>
			<View>
				<Text style={{ color: "#9b9999", fontSize: 18 }}>{price}</Text>
			</View>
		</View>
	</TouchableOpacity>
);
class RestaurantView extends React.Component {
	state = {
		loading: true,
		isModalVisible: false,
		restaurantData: [
			{
				image: require("../../../assets/chicken.jpg"),
				foodTitle: "Crispy Chicken Sandwitch",
				restaurantName: "Ada Days",
				rating: 3,
				price: "25",
				restaurantAddress: "some sort of restaurant address",
			},
			{
				image: require("../../../assets/burger.jpg"),
				foodTitle: "Shrimp Seafood",
				restaurantName: "Cadde Mutfak",
				rating: 5,
				price: "45",
				restaurantAddress: "some sort of restaurant address",
			},
			{
				image: require("../../../assets/steak.jpg"),
				foodTitle: "Doner",
				restaurantName: "Dama Döner Kebap House",
				rating: 4,
				price: "15",
				restaurantAddress: "some sort of restaurant address",
			},
			{
				image: require("../../../assets/pizza.jpg"),
				foodTitle: "Crispy Chicken Sandwitch",
				restaurantName: "Ada Days",
				rating: 3,
				price: "25",
				restaurantAddress: "some sort of restaurant address",
			},
			{
				image: require("../../../assets/seafood.jpg"),
				foodTitle: "Shrimp Seafood",
				restaurantName: "Cadde Mutfak",
				rating: 5,
				price: "45",
				restaurantAddress: "some sort of restaurant address",
			},
			{
				image: require("../../../assets/chicken.jpg"),
				foodTitle: "Doner",
				restaurantName: "Dama Döner Kebap House",
				rating: 4,
				price: "15",
				restaurantAddress: "some sort of restaurant address",
			},
		],
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 50);
	}

	toggleModal = () => this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));

	modalContentHandler = () => (
		<View style={styles.modalContent}>
			<Icon name="home" style={{ fontSize: 50 }} />
			<Text>Some restaurant related Content Here</Text>
		</View>
	);

	savingRestaurantHandler = () => {
		const restaurantDetail = {
			title: this.props.restaurant.title,
			tags: this.props.restaurant.tags,
			price: this.props.restaurant.price,
			rating: this.props.restaurant.rating,
		};

		this.props.saveRestaurant(restaurantDetail);
		Alert.alert("Saved", "Restaurant saved successfully");
	};

	fullRenderItem({ item }) {
		const { width } = Dimensions.get("window");
		const itemWidth = width - 50;
		return (
			<Card style={{ width: itemWidth }}>
				<CardItem cardBody>
					<View style={{ width: itemWidth, height: 150 }}>
						<Image source={item.image} style={styles.restaurantImg} />
					</View>
				</CardItem>
				<CardItem footer style={[styles.slide, { height: 80 }]}>
					<View>
						<Text style={[styles.title, EffraRegular, bold]}>{item.restaurantName}</Text>
						<Text style={styles.subTitle}>{item.restaurantAddress}</Text>
						<View style={[mt10, { width: "100%", flexDirection: "row", justifyContent: "space-between" }]}>
							<View style={{ width: "20%" }}>
								<StarRating fullStarColor="#f5d10b" starSize={16} disabled={false} maxStars={5} rating={item.rating} />
							</View>
							<View style={{ width: "80%", alignItems: "flex-end" }}>
								<Text style={[styles.subTitle]}>Open 8:00 AM</Text>
							</View>
						</View>
					</View>
				</CardItem>
			</Card>
		);
	}

	render() {
		const { width, height } = Dimensions.get("window");
		if (this.state.loading) {
			return (
				<Container>
					<Content>
						<View style={{ alignItems: "center", justifyContent: "center", flex: 1, height }}>
							<ActivityIndicator
								animating
								color="rgba(200,2,51,1)"
								size="large"
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									height: 80,
								}}
							/>
						</View>
					</Content>
				</Container>
			);
		}
		return (
			<StyleProvider style={getTheme(CustomTheme)}>
				<Container>
					<Header>
						<Left>
							<Button transparent>
								<RouterBackBtn white />
							</Button>
						</Left>
						<Body>
							<View style={{ width: 200 }}>
								<Text style={[{ fontSize: 18, top: -10 }, wClr, mt20, AvenirLTStdBlack]} numberOfLines={1} ellipsizeMode="tail">
									Browse Menu
								</Text>
							</View>
						</Body>
						<Right>
							<Button transparent onPress={Actions.main_cart}>
								<View
									style={{
										position: "absolute",
										top: 5,
										left: 5,
										zIndex: 100,
										backgroundColor: "rgba(200,2,51,0.85)",
										width: 25,
										height: 25,
										borderRadius: 12,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text style={wClr}>{this.props.cartItems.length}</Text>
								</View>
								<Icon name="basket" type="SimpleLineIcons" style={{ fontSize: 30 }} />
							</Button>
						</Right>
					</Header>
					<Content padder style={{ backgroundColor: "#f4f4f5" }}>
						<Modal backdropOpacity={0.5} isVisible={Boolean(this.state.isModalVisible)} hideModalContentWhileAnimating>
							<View style={[styles.modalContainer]}>
								{this.modalContentHandler()}
								<TouchableOpacity onPress={this.toggleModal} style={styles.modalContentClose}>
									<View style={{ flexDirection: "row" }}>
										<Text style={{ color: "red" }}>Close</Text>
										<Icon name="close-o" type="EvilIcons" style={{ fontSize: 25, color: "red" }} />
									</View>
								</TouchableOpacity>
							</View>
						</Modal>
						<View style={styles.restaurantHeader}>
							<Text style={[styles.restaurantHeaderTitle, mt10, mb10, AvenirLTStdBlack]}>{this.props.restaurant.title}</Text>
							<Text style={[styles.restaurantHeaderDetails]}>Some sort of address, 769, Nicosia</Text>
							<View style={[mb20, { width: "20%" }]}>
								<StarRating
									fullStarColor="red"
									starSize={10}
									disabled={false}
									maxStars={5}
									rating={this.props.restaurant.rating}
								/>
							</View>
							<View style={[mb20, { flexDirection: "row", justifyContent: "space-between" }]}>
								<View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
									<Text style={bold}>Delivery</Text>
									<Text>Free</Text>
								</View>
								<View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
									<Text style={bold}>Open Time</Text>
									<Text>8:00 AM</Text>
								</View>
							</View>
							<View style={[mb20, styles.restaurantHeaderFooter]}>
								<View style={{ flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
									<TouchableOpacity onPress={this.toggleModal}>
										<View
											style={{
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "#CCC",
												borderRadius: 50,
												width: 30,
												height: 30,
											}}
										>
											<Icon name="attach-money" type="MaterialIcons" style={{ fontSize: 15 }} />
										</View>
									</TouchableOpacity>
									<TouchableOpacity onPress={this.toggleModal}>
										<View
											style={{
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "#CCC",
												borderRadius: 50,
												width: 30,
												height: 30,
											}}
										>
											<Icon name="ios-timer" style={{ fontSize: 15 }} />
										</View>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this.savingRestaurantHandler()}>
										<View
											style={{
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "#CCC",
												borderRadius: 50,
												width: 30,
												height: 30,
											}}
										>
											<Icon name="ios-heart-empty" style={{ fontSize: 15 }} />
										</View>
									</TouchableOpacity>
								</View>
								<View>
									<Button full bordered style={{ borderRadius: 20, width: 100, height: 35 }} onPress={() => this.toggleModal()}>
										<Text>Contact</Text>
									</Button>
								</View>
							</View>
						</View>
						<View style={styles.bodyContainer}>
							<View style={[mt20, { flex: 1 }]}>
								<H2 style={AvenirLTStdBlack}>FEATURED ITEM</H2>
								<Carousel
									ref={c => {
										this._carousel = c; // eslint-disable-line
									}}
									data={this.state.restaurantData}
									renderItem={this.fullRenderItem}
									sliderWidth={width - 40} // 20 of left right slide
									itemWidth={width}
									itemHeight={height}
									enableMomentum
									// contentContainerCustomStyle={{
									//   left: -45
									// }}
								/>
							</View>
							<Text style={[styles.restaurantMenuTitle, mt10, mb10, AvenirLTStdBook, bold]}>MENU</Text>
							<View style={[mb20, mt10]}>
								<View style={{ borderBottomWidth: 1, borderBottomColor: colors.primary, paddingVertical: 5 }}>
									<Text style={{ color: colors.primary }}>Some Food Category</Text>
								</View>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 0,
											restaurantName: this.props.restaurant.title,
											title: "Some Long name of food",
											tags: "Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Doner"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									event={() =>
										Actions.foodConfirmation({
											id: 1,
											restaurantName: this.props.restaurant.title,
											title: "Doner title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Burger"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									event={() =>
										Actions.foodConfirmation({
											id: 2,
											restaurantName: this.props.restaurant.title,
											title: "Burger title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									event={() =>
										Actions.foodConfirmation({
											id: 3,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									event={() =>
										Actions.foodConfirmation({
											id: 4,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 5,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 6,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
							</View>
							<View style={[mb20, mt10]}>
								<View style={{ borderBottomWidth: 1, borderBottomColor: colors.primary, paddingVertical: 5 }}>
									<Text style={{ color: colors.primary }}>Food Category</Text>
								</View>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 7,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 8,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 9,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 10,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 11,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 12,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 13,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
							</View>
							<View style={[mb20, mt10]}>
								<View style={{ borderBottomWidth: 1, borderBottomColor: colors.primary, paddingVertical: 5 }}>
									<Text style={{ color: colors.primary }}>Food Category</Text>
								</View>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 14,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 15,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 16,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 17,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 18,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 19,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 20,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
							</View>
							<View style={[mb20, mt10]}>
								<View style={{ borderBottomWidth: 1, borderBottomColor: colors.primary, paddingVertical: 5 }}>
									<Text style={{ color: colors.primary }}>Food Category</Text>
								</View>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 21,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 22,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 23,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 24,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some food"
									price="35.00 TL"
									tags="Fast Food & Sandwich"
									notAvailable
									event={() =>
										Actions.foodConfirmation({
											id: 25,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 26,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
								<MenuItem
									title="Some Long name of food"
									price="7.00 TL"
									tags="Fast Food & Sandwich, Hamburger, World Cuisine, Fast Food & Sandwich, Hamburger, World Cuisine"
									event={() =>
										Actions.foodConfirmation({
											id: 27,
											restaurantName: this.props.restaurant.title,
											title: "Some Food title",
											tags: "Fast Food, some more tags, etc",
											price: "10",
										})
									}
								/>
							</View>
						</View>
					</Content>
				</Container>
			</StyleProvider>
		);
	}
}

const mapStateToProps = state => {
	return {
		cartItems: state.cart.cartItem,
	};
};

export default connect(
	mapStateToProps,
	{
		saveRestaurant,
	}
)(RestaurantView);
