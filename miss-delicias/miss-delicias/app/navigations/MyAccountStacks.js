import { createStackNavigator } from 'react-navigation-stack';
import  MyAccountScreen  from '../screens/MyAccount';

const MyAccountScreenStacks =  createStackNavigator({
	TopRestaurants: {
		screen : MyAccountScreen,
		navigationOptions:() => ({
			title : "Mi cuenta"
		})
	}
});



export default MyAccountScreenStacks;