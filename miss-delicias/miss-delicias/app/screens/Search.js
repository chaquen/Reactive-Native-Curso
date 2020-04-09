import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {SearchBar, ListItem, Icon} from 'react-native-elements';
import { useDebouncedCallback } from 'use-debounce';
import { FireSQL } from 'firesql';
import firebase from  'firebase/app';
const fireSQL = new FireSQL(firebase.firestore(),{includeId:"id"});

export default function Search(props){
	const { navigation } = props;
	const [restaurants, setRestaurants] = useState([]);
	const [search, setSearch]= useState("");
	
	
	useEffect(()=>{
		onSearchChangeText();		
	},[search]);
	const [onSearchChangeText] = useDebouncedCallback(()=>{
		if(search){
			fireSQL.query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
			.then(response =>{
				 	
				setRestaurants(response);
			});
		}
	}, 300);
	return (

		<View>
			<SearchBar 
				placeholder="Busca tu restaurante"
				onChangeText={e => setSearch(e)}
				value={search}
				containerStyle={styles.searchBar}
			/>
			{restaurants.length === 0 ? 
				(
					
					<NoFoundRestaurants />
					
				) : 
					(
					<FlatList 
							data={restaurants}
							renderItem={restaurant => <Restaurant restaurant={restaurant} navigation={navigation}/>}
							keyExtractor={(itrem,index)=> index.toString()}
						/>
					)
			}

		</View>


	);
}

function Restaurant(props){
	const { restaurant, navigation } = props;
	const { name, images } = restaurant.item;
	const [ imageRestaurant, setImageRestaurant]= useState(null);

	useEffect(() => {
		const image = images[0];
		firebase
            .storage()
            .ref(`restaurants-images/${image}`)
            .getDownloadURL()
            .then(result => {
                setImageRestaurant(result);
            });
	},[]);
	
	return (
		<ListItem 
			title={name}
			leftAvatar={{source:{uri:imageRestaurant}}}
			rightIcon={<Icon 
				type="material-community"
				name="chevron-right"
				onPress={ () => navigation.navigate("InfoRestaurant",{restaurant:restaurant.item})}
			/>}
		/>	
	);
} 
function NoFoundRestaurants() {
	return (
	  <View style={{ flex: 1, alignItems: "center" }}>
		<Image
		  source={require("../../assets/img/no-result-found.png")}
		  resizeMode="cover"
		  style={{ width: 200, height: 200 }}
		/>
	  </View>
	);
  }
const styles = StyleSheet.create({
	searchBar:{
		marginBottom:20
	}
});
