import React, { useRef } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../components/account/RegisterForm';
import Toast from 'react-native-easy-toast';

export default function Register(){
	const toastRef = useRef();
	return (
		<KeyboardAwareScrollView>
			<Image 
					source = { require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
					style = { styles.logo }
					resizeMode = 'contain'
			/>
			<View style={ styles.viewForm }>
				<RegisterForm toastRef= { toastRef } />
			</View>	
		<Toast ref={ toastRef } position = "top" opacity = { 0.7 } />
		</KeyboardAwareScrollView>

	);
}

const styles = StyleSheet.create({
	logo:{
		width: '100%',
		height: 150,
		marginTop: 20

	},
	viewForm:{
		marginRight: 40,
		marginLeft: 40,

	}


});