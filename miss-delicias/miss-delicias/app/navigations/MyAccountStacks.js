import { createStackNavigator } from 'react-navigation-stack';
import  MyAccountScreen  from '../screens/account/MyAccount';
import  LoginScreen  from '../screens/account/Login';
import  RegisterScreen from '../screens/account/Register';
/*El orden de esta pila es el orden en que se muestra la ventana de navegación a la que pertenecen*/
const MyAccountScreenStacks =  createStackNavigator({
	Login: {
		screen : LoginScreen,
		navigationOptions:()=>({
			title:"Iniciar sesión"
		})
	},
	MyAccount: {
		screen : MyAccountScreen,
		navigationOptions:() => ({
			title : "Mi cuenta"
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