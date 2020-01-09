import React from 'react';
import { StyleSheet, View, ScrollView, 	Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default function UserGuest(){
	return (
		<ScrollView style={styles.viewBody} centerContent={true}>
			<Image 
				source = {require("../../../assets/img/user-guest.jpg")}
				style={styles.image}
				resizeMode='contain'
			/>
			<Text style={styles.title}>Consulta tu perfil en miss-delicias</Text>
			<Text style={styles.description}>
				¿Cómo descubririas los mejores restaurantes de tu ciudad?, 
				encuentra los mejores restaurantes cerca de tu ciudad, comparte con tus amigos
			</Text>
			<View style={styles.viewBtn}>
					<Button 
						buttonStyle={styles.btnStyle}
						containerStyle={styles.btnContainer}
						title="Ver tu perfil"
						onPress={()=>console.log("Ver perfíl presionado!")}
					/>
			</View>
		</ScrollView>

	);
}

const styles = StyleSheet.create({
	viewBody: {
		marginLeft: 30,
		marginRight: 30
	},
	image:{
		height: 300,
		width: "100%",
		marginBottom: 40
	},
	title:{
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 10,
		textAlign: 'center'
	},
	description:{
		textAlign: 'center',
		marginBottom: 20 
	},
	viewBtn:{
		flex: 1,
		alignItems: 'center' 
	},
	btnStyle:{
		backgroundColor: '#00a680'		
	},
	btnContainer:{
		width: '70%'
	}

});