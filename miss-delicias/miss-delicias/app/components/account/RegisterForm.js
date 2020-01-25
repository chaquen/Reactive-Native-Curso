import React, { useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';


export default function RegisterForm(){
	const [ hidePassword, setHidePassword] = useState(true);
	const [ hideConfirmPassword, setHideConfirmPassword] = useState(true);

	const register = () => {
		console.log("Usuario Registrado");
	};
	
	return (
		<View style = { styles.formContainer }>
			<Input
				placeholder = "Correo electrónico"
				containerStyle = { styles.inputForm }
				onChange = { ()=> console.log('Correo electrónico actualizado')}
				rightIcon = {
					<Icon
						type= "material-community"
						name= "at"
						iconStyle= { styles.iconRight}
					/>
				}
			/>
			<Input
				placeholder = "Contraseña"
				password= { true }
				secureTextEntry={ hidePassword }
				containerStyle = { styles.inputForm }
				onChange = { ()=> console.log('Contraseña actualizada')}
				rightIcon = {
					<Icon
						type = "material-community"
						name = {hidePassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle = { styles.iconRight}
						onPress = {() => setHidePassword(!hidePassword)}

					/>
				}
			/>
			<Input
				placeholder = "Repite la contraseña"
				password = { true }
				secureTextEntry ={ hideConfirmPassword }
				containerStyle = { styles.inputForm }
				onChange = { ()=> console.log('Contraseña repetida actualizada')}
				rightIcon = {
					<Icon
						type= "material-community"
						name = {hideConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle= { styles.iconRight}
						onPress = {() => setHideConfirmPassword(!hideConfirmPassword)}
					/>
				}
			/>
			<Button 
				title = "Unirse"
				containerStyle = { styles.btnContainerRegister}
				buttonStyle = { styles.btnRegister }
				
			/>	
			
		</View>
	);

}

const styles = StyleSheet.create({
	formContainer:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	},
	inputForm:{
		width: '100%',
		height: 30,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5
		
	},
	iconRight:{
		color: '#c1c1c1'
	},
	btnContainerRegister: {
		marginTop: 20,
		width: '95%'
	},
	btnRegister:{
		backgroundColor: '#00a680'
	}


});

