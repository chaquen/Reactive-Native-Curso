import { createStackNavigator } from 'react-navigation-stack';
import  RestaurantsScreen  from '../screens/Restaurants';
import AddRestaurantsScreen from '../screens/Restaurants/AddRestaurants';
import InfoRestaurantScreen from '../screens/Restaurants/InfoRestaurant';

const RestaurantsScreenStacks =  createStackNavigator({
	Restaurants: {
		screen : RestaurantsScreen,
		navigationOptions:() => ({
			title : "Restaurantes"
		})
	},
	AddRestaurants:{
		screen:AddRestaurantsScreen,
		navigationOptions: () => ({
			title: "Agregar Restaurante"
		})
	},
	InfoRestaurant:{
		screen:InfoRestaurantScreen,
		navigationOptions: props => ({
			title: props.navigation.state.params.restaurant.item.restaurant.name
		})
	}
});



export default RestaurantsScreenStacks;