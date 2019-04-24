import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import { Container, Header, Content, Icon, Button, H2, Card, CardItem, Body, Left, Right } from "native-base";
import { Actions } from "react-native-router-flux";
import RouterBackBtn from "../../components/common/routeBackBtn";
// styles
import { AvenirLTStdBlack, EffraRegular } from "../../styles/font.style";
import { mb20, mt20, wClr } from "../../styles/index.style";

const styles = StyleSheet.create({
	tagsColor: {
		color: "rgba(200,2,51,1)",
	},
	restaurantFooter: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	restaurantTag: {
		color: "#CCC",
		width: "50%",
		fontSize: 10,
	},
	restaurantName: {
		color: "#000",
	},
});

const RestaurantListView = ({ title, tags, price, ratings, closed, event }) => (
	<TouchableOpacity onPress={event}>
		<View>
			<Card>
				<CardItem header style={{ marginBottom: -15 }}>
					<H2 style={[EffraRegular, { color: closed ? "#CCC" : "#000" }]}>{title}</H2>
				</CardItem>
				<CardItem>
					<Body>
						<StarRating
							fullStarColor={closed ? "grey" : "red"}
							starSize={16}
							disabled={false}
							maxStars={5}
							rating={ratings || 4}
						/>
					</Body>
				</CardItem>
				<CardItem footer style={{ marginTop: -5, paddingHorizontal: 15, paddingVertical: 6 }}>
					<View style={styles.restaurantFooter}>
						{tags ? <Text style={[styles.restaurantTag, { color: closed ? "#CCC" : "#000" }]}>{tags}</Text> : null}
						{price ? <Text style={[styles.tagsColor, { color: closed ? "#CCC" : "rgba(200,2,51,1)" }]}>{price}</Text> : null}
					</View>
					{closed ? <Text style={[styles.tagsColor, { color: closed ? "#CCC" : "rgba(200,2,51,1)" }]}>Closed</Text> : null}
				</CardItem>
			</Card>
		</View>
	</TouchableOpacity>
);

class RestaurantList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			starCount: 4, // eslint-disable-line
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 50);
	}

	render() {
		const { height } = Dimensions.get("window");
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
			<Container>
				<Header>
					<Left>
						<Button transparent>
							<RouterBackBtn white />
						</Button>
					</Left>
					<Body>
						<View style={{ width: 200 }}>
							<Text style={[{ fontSize: 18, top: -10 }, wClr, mt20, AvenirLTStdBlack]}>Choose Restaurant</Text>
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
								<Text style={wClr}>{(this.props.cartItems && this.props.cartItems.length) || 0}</Text>
							</View>
							<Icon name="basket" type="SimpleLineIcons" style={{ fontSize: 30 }} />
						</Button>
					</Right>
				</Header>
				<Content padder>
					<Text style={mb20}>
						Please browse various restaurant of your choice from below list of restaurants. We try our best best always that you
						get the right choice for yourself.
					</Text>
					<RestaurantListView
						title="Ada Days"
						tags="Chicken, Kebab, Pide, Pizza & Italian"
						price="min. 10,00 TL"
						rating={2}
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Ada Days",
									tags: "Chicken, Kebab, Pide, Pizza & Italian",
									price: "min. 10,00 TL",
									rating: 2,
								},
							})
						}
					/>
					<RestaurantListView
						title="Cadde Mutfak"
						tags="Chicken, Doner, Homemade, Pide"
						price="min. 10,00 TL"
						rating={1}
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Cadde Mutfak",
									tags: "Chicken, Doner, Homemade, Pide",
									price: "min. 10,00 TL",
									rating: 1,
								},
							})
						}
					/>
					<RestaurantListView
						title="Dama Döner Kebap House"
						tags="Doner, Kebab, Pide"
						price="min. 10,00 TL"
						rating={3}
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Dama Döner Kebap House",
									tags: "Doner, Kebab, Pide",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="Gomşu Restaurant"
						tags="Chicken, Kebab, Pide, Raw Meatballs"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Gomşu Restaurant",
									tags: "Chicken, Kebab, Pide, Raw Meatballs",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="Hamburg"
						tags="Fast Food & Sandwich, Hamburger, World Cuisine"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Hamburg",
									tags: "Fast Food & Sandwich, Hamburger, World Cuisine",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="Memetali Döner Kebap"
						tags="Doner, Kebab, Pide"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Memetali Döner Kebap",
									tags: "Doner, Kebab, Pide",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="My Döner 2"
						tags="Chicken, Doner, Kebab, Pide, Pizza & Italian"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "My Döner 2",
									tags: "Chicken, Doner, Kebab, Pide, Pizza & Italian",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="Northern Fried Chicken"
						tags="Chicken, Fast Food & Sandwich"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Northern Fried Chicken",
									tags: "Chicken, Fast Food & Sandwich",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="Nurhayal Künefe"
						tags="Dessert"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Nurhayal Künefe",
									tags: "Dessert",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView
						title="Vabi Waffle & Kumpir House"
						tags="Chicken, Dessert, Fast Food & Sandwich, Hamburger, Mashed Potato"
						price="min. 10,00 TL"
						event={() =>
							Actions.restaurantView({
								restaurant: {
									title: "Vabi Waffle & Kumpir House",
									tags: "Chicken, Dessert, Fast Food & Sandwich, Hamburger, Mashed Potato",
									price: "min. 10,00 TL",
									rating: 3,
								},
							})
						}
					/>
					<RestaurantListView title="Baba Ensar Döner" closed price="min. 10,00 TL" />
					<RestaurantListView title="BBQ Cafe & Restaurant" closed price="min. 10,00 TL" />
					<RestaurantListView title="Berkem Restaurant" closed price="min. 10,00 TL" />
					<RestaurantListView title="Cafe Beyler" closed price="min. 10,00 TL" />
					<RestaurantListView title="Cafe Şefler Grill House" closed price="min. 10,00 TL" />
					<RestaurantListView title="Canteen" closed price="min. 10,00 TL" />
					<RestaurantListView title="Cumhuriyet Restaurant" closed price="min. 10,00 TL" />
				</Content>
			</Container>
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
	{}
)(RestaurantList);
