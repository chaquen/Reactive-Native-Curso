import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

export default function Login(){
	return (
		<ScrollView>
			<Image
				source = { require('../../../assets/img/5-tenedores-letras-icono-logo.png') }
				style = { styles.logo }
				resizeMode = 'contain'
			/>
			<View
			    style = { styles.viewContainer }	
			>
				<Text> Form login ...</Text>
				<Text> SUBMIT ...</Text>
			</View>
			<Divider
				style = {styles.divider} 
			></Divider>
			<View
			    style = { styles.viewContainer }>
				<Text> LOGIN FACEBOOK.</Text>
			</View>
		</ScrollView>
		
	);
}

const styles = StyleSheet.create({
	logo:{
		width: '100%',
		height: 150,
		marginTop: 20	
	},
	viewContainer: {
		marginTop: 40,
		marginLeft: 40
	},
	divider:{
		backgroundColor: '#00a680',
		margin:40
	}


});
