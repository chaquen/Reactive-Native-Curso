import { createStackNavigator } from 'react-navigation-stack';
import  MyAccountScreen  from '../screens/account/MyAccount';
import  LoginScreen  from '../screens/account/Login';
import  RegisterScreen from '../screens/account/Register';

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
			title:"Iniciar sesión"
		})
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions:()=>({
			tittle:"Registro"
		})
	}
});



export default MyAccountScreenStacks;