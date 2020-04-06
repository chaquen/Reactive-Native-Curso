import React , { useState, useEffect, useRef  }from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList, 
    ActivityIndicator, 
    TouchableOpacity } from 'react-native';
import { Image,Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../components/Loading';
import {firebaseApp  } from '../utils/FireBase';
import firebase from "firebase/app";
import "firebase/firestore";
const db =  firebase.firestore(firebaseApp);


export default function Favorites(props){
    const { navigation } = props;
    const [restaurants,setRestaurants]=useState([]);
    const [loading, setLoading]=useState(false);
    const toastRef = useRef();
        
    useEffect(()=>{
        setLoading(true);
        const idUser = firebase.auth().currentUser.uid;
       
        db.collection("favorites")
        .where("idUser","==",idUser)
        .get()
        .then(response =>{
            const idRestaurantsArray=[];
            response.forEach(doc => {
                
                idRestaurantsArray.push(doc.data().idRestaurant)
            });
           getDataRestaurants(idRestaurantsArray).then(response =>{
               const resturants = [];
                response.forEach(item => {
                    
                    const resturant = item.data();
                    resturant.id = item.id;//asigno el id del elemento de la coleccción
                    resturants.push(resturant);
                });
                setRestaurants(resturants);
                setLoading(false);
           });
            
        })
    },[]);
       
    const getDataRestaurants = idRestaurantArray => {
        const arrayRestaurants = [];
        idRestaurantArray.forEach(restaurant => {
            
            let infoResturant = db.collection("restaurants")
                                    .doc(restaurant)
                                    .get();
            arrayRestaurants.push(infoResturant);
        });
        
        return Promise.all(arrayRestaurants);
    };    
 
    return (
        <View style={styles.viewBody}>
            {restaurants ? 
            (
            <FlatList
                data={ restaurants }
                renderItem = { restaurant => (
                                <Restaurant restaurant={restaurant} navigation={navigation} toastRef={toastRef}/>
                             )}
                keyExtractor={(item,index)=> index.toString()}

            />)
            :(<View style={styles.loaderRestaurant}>
                <ActivityIndicator size="large"/>
                <Text>Cargando restaurantes</Text>
            </View> )}
        <Toast ref={toastRef} position="center" opacity={0.5} />
        <Loading isVisible={loading} text="Cargando favoritos" />
        </View>
        
    );
}

function Restaurant(props){

    const { restaurant,navigation,toastRef }=props;
    const {name,images} = restaurant.item;
    const [imageRestaurant,setImageRestaurant]=useState(null);

    
    useEffect(()=>{
        const image = images[0];
        firebase.storage()
        .ref(`restaurants-images/${image}`)
        .getDownloadURL()
        .then(response => {
            setImageRestaurant(response);            
        });
    },[]);
    return (
        <View style={styles.viewRestaurant}>
            <TouchableOpacity onPress={()=> 
                navigation.navigate("InfoRestaurant",{restaurant:restaurant.item})
            } >   
                <Image 
                    resizeMode="cover"
                    source={{uri:imageRestaurant}}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff"/>}
                />
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Icon
                    type="material-community"
                    name="heart"
                    color="#00a680"
                    containerStyle={styles.favorite}
                    onPress={()=> console.log("eliminando")}
                    size={40}
                    underlayColor="transparent"


                />
            </View>
        </View>
    ); 
}
const styles = StyleSheet.create({
    loaderRestaurant:{
        marginTop:10,
        marginBottom:10
    },
    viewBody:{
        flex:1,
        backgroundColor:"#f2f2f2"
    },
    viewRestaurant:{
        margin:10
    },
    image:{
        width:"100%",
        height:180
    },
    info:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        marginTop:-30,
        backgroundColor:"#fff"

    },
    name:{
        fontWeight:"bold",
        fontSize:13
    },
    favorite:{
     marginTop:-60,
     backgroundColor:"#fff",
     padding:15,
     borderRadius:15,
     
    }
});