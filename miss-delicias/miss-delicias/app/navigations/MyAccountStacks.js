import { createStackNavigator } from 'react-navigation-stack';
import  MyAccountScreen  from '../screens/account/MyAccount';

const MyAccountScreenStacks =  createStackNavigator({
	TopRestaurants: {
		screen : MyAccountScreen,
		navigationOptions:() => ({
			title : "Mi cuenta"
		})
	}
});



export default MyAccountScreenStacks;