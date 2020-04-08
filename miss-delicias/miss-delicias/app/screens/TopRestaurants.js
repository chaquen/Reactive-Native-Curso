import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Cards, Image, Rating } from "react-native-elements";
import  Toast  from "react-native-easy-toast";
import  ListTopRestaurants  from '../components/Ranking/ListTopRestaurants';

import { firebaseApp } from '../utils/FireBase';
import  firebase  from "firebase/app";
import  "firebase/firestore";
const db = firebase.firestore(firebaseApp);


export default function TopRestaurants(props){
	const { navigation } = props;
	const [restaurants, setRestaurants]=useState([]);
	const toastRef =  useRef();

	useEffect(()=>{
		(async () => {
			db
			.collection("restaurants")
			.orderBy("rating","desc")
			.limit(5)
			.get()
			.then(response => {
				const  restaurantsArray = [];
				
				response.forEach( doc => {
					const restaurant = doc.data();
					restaurant.id=doc.id;
					restaurantsArray.push(restaurant);
				});
				setRestaurants(restaurantsArray);				
			})
			.catch(() => {
				toastRef.current.show("Error al cargar el ranking de los restaurantes, por favor intentelo más tarde",4000);
			});
		})()
	},[]);

	return (

		<View>
			<ListTopRestaurants  restaurants={restaurants} navigation={navigation}/>
			<Toast ref={toastRef} position="center" opacity={1}  />
		</View>

	);
}


const styles = StyleSheet.create({

});