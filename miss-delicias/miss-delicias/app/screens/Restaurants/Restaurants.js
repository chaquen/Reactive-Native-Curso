import React,{ useState, useEffect} from 'react';
import {StyleSheet,View, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import ListRestaurants from '../../components/Restaurants/ListRestaurants';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);


export default function Restaurants(props){
 const {navigation}=props;
 const [ user, setUser ] = useState(null);
 const [ restaurants,setRestaurants ] = useState([]);
 const [ startRestaurants , setStartRestaurants ]=useState(null);
 const [ isLoading,setIsLoading ] = useState(false);
 const [ totalRestaurants,setTotalRestaurant]= useState(0);
 const limitRestaurants = 8;
  
 useEffect(()=>{
	firebase.auth().onAuthStateChanged(userInfo => {
		setUser(userInfo);
	})
 },[]);
 useEffect(()=> {
	 db.collection("restaurants")
	   .get()
	   .then( snap => {
		setTotalRestaurant(snap.size);
	   });
	   
	 (async () => {
		const resultRestaurant = [];
		const restaurants = db
						  .collection('restaurants')
						  .orderBy('createAt','desc')
						  .limit(limitRestaurants);
		await restaurants.get().then(response => {
			setStartRestaurants(response.docs[response.docs.length - 1]); 
			
			response.forEach(doc => {
				
				let restaurant = doc.data();
				restaurant.id= doc.id;
				resultRestaurant.push({restaurant});
			});
			setRestaurants(resultRestaurant);
		})
	 })()
 },[]);

 const handleLoadMore = async ()=> {
	let resultRestaurants=[];
	restaurant.length < totalRestaurants && setIsLoading(true);
	let restaurantsDb = db.collection("restaurants")
							.orderBy("createdAt","desc")
							.startAfter(startRestaurants.data().createAt)
							.limit(limitRestaurants);
	await restaurantsDb.get()
			.then(response => {
				if(response.docs.length > 0){
					setStartRestaurants(response.docs[response.docs.length -1 ]);
				}else{
					setIsLoading(false);
				}

				response.forEach( doc => {
					let restaurant = doc.data();
					restaurant.id= doc.id;
					resultRestaurants.push({ restaurants});
				});
				setRestaurants([...restaurants, ...resultRestaurants])
			});
 };
 return (
 	<View style={styles.viewBody}>
 			<ListRestaurants 
				restaurants={restaurants}
				isLoading={isLoading}
				handleLoadMore={handleLoadMore}
			 />
			{user && <AddRestaurantButton navigation={navigation}/>} 
 	</View>
 );

}

function AddRestaurantButton(props){
	const {navigation}=props;
 	
	return (
		<ActionButton 
			buttonColor="#00a680"
			onPress={()=>navigation.navigate('AddRestaurants')}
		/>
	);
}

const styles = StyleSheet.create({
	viewBody:{
		flex:1
	}
});