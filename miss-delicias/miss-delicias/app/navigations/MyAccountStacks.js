import { createStackNavigator } from 'react-navigation-stack';
import  MyAccountScreen  from '../screens/account/MyAccount';
import  LoginScreen  from '../screens/account/Login';

const MyAccountScreenStacks =  createStackNavigator({
	MyAccount: {
		screen : MyAccountScreen,
		navigationOptions:() => ({
			title : "Mi cuenta"
		})
	},
	Login: {
		screen : LoginScreen,
		navigationOptions:()=>({
			title:"Login"
		})
	}
});



export default MyAccountScreenStacks;