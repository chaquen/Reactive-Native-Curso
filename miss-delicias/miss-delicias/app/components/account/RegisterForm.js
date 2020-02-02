import React, { useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import  * as firebase  from 'firebase';


export default function RegisterForm(props){
	const { toastRef } = props;
	const [ hidePassword, setHidePassword] = useState(true);
	const [ hideConfirmPassword, setHideConfirmPassword] = useState(true);
	const [ email, setEmail] = useState("");
	const [ password, setPassword] = useState("");
	const [ confirmPassword, setConfirmPassword] = useState("");

	const register = async () => {

		if(!email || !password || !confirmPassword){
			toastRef.current.show("Todos los campos son obligatorios");
		}else{
			if(!validateEmail(email)){
				toastRef.current.show("El email no es valido");
			}else if(password !== confirmPassword){
				toastRef.current.show("Las contraseñas deben ser iguales");
			}else{
				await firebase
					  .auth()
					  .createUserWithEmailAndPassword(email,password)
					  .then(()=>toastRef.current.show("Usuario registrado"))
					  .catch(()=>toastRef.current.show("Error al crear el usuario"))

			}
		}			
	};
	
	return (
		<View style = { styles.formContainer }>
			<Input
				placeholder = "Correo electrónico"
				containerStyle = { styles.inputForm }
				onChange = { e => setEmail(e.nativeEvent.text) }
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
				onChange = { e => setPassword(e.nativeEvent.text) }
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
				onChange = { e => setConfirmPassword(e.nativeEvent.text)}
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
				onPress = { register }
				
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

